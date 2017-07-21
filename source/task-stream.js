const { Readable, Transform } = require(`stream`)

const Queue = (options, { tasks = [], concurrency = 1 } = options) => {
  const tasksCopy = [ ...tasks ]

  const stream = new Readable({
    objectMode: true,
    highWaterMark: concurrency
  })

  stream._read = () => {
    const nextTask = tasksCopy.shift()
    nextTask !== undefined
    ? stream.push(nextTask)
    : stream.push(null)
  }

  return stream
}

const runTask = (task, callback) => {
  switch (task.constructor.name) {
    default:
      callback(null, task)
  }
}

const TaskRunner = (options = {}, { concurrency = 1 } = options) => {
  const stream = new Transform({
    objectMode: true,
    highWaterMark: concurrency
  })

  stream._transform = (task, encoding, callback) => {
    runTask(task, callback)
  }

  return stream
}

const TaskStream = (options = {}) => {
  const stream = Queue(options).pipe(TaskRunner(options))
  stream.constructor = TaskStream
  return stream
}

module.exports = TaskStream
