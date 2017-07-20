const { Transform } = require(`readable-stream`)

module.exports = new Transform({
  transform: (episode, encoding, callback) => {
    callback(null, JSON.stringify(episode, null, 2))
  },
  objectMode: true
})
