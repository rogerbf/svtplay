const { Readable, Transform, Duplex, Writable } = require(`stream`)

const Queue = (
  options = { tasks: [], concurrency: 1 },
  tasks = [ ...(options.tasks ? options.tasks : []) ],
  concurrency = options.concurrency || 1
) => {
  const stream = new Readable({
    objectMode: true,
    highWaterMark: concurrency
  })

  stream._read = () => {
    let task = tasks.shift()
    if (task) {
      stream.push(task)
    } else {
      stream.push(null)
    }
  }

  return stream
}

const execute = ({ stream, task, callback }) => {
  switch (task.constructor.name) {
    case `Function`:
      try {
        execute({ stream, task: task(), callback })
      } catch (error) {
        callback(error)
      }
      break
    case `Promise`:
      task
      .then(success => {
        stream.push(success)
        callback()
      })
      .catch(error => setImmediate(callback, error))
      break
    default:
      stream.push(task)
      callback()
      break
  }
}

const TaskRunner = (options = {}, { concurrency = 1 } = options) => {
  const stream = new Duplex({
    objectMode: true,
    highWaterMark: concurrency
  })

  stream._write = (task, encoding, callback) => {
    if (task.constructor.name === `TaskStream`) {
      task.pipe(new Writable({
        objectMode: true,
        highWaterMark: concurrency,
        write: (data, encoding, done) => {
          data && stream.push(data)
          done()
        },
        final: done => {
          callback()
          done()
        }
      }))
    } else {
      execute({ stream, task, callback })
    }
  }

  stream._read = () => {}

  return stream
}

const TaskStream = (options = {}) => {
  const stream = Queue(options).pipe(TaskRunner(options))
  stream.constructor = TaskStream
  return stream
}

module.exports = TaskStream
