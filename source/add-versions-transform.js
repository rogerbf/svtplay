const { Transform } = require(`stream`)
const { video } = require(`./api`)

module.exports = new Transform({
  transform: (episode, encoding, callback) => {
    Promise.all(episode.versions.map(({ id }) => video({ id })))
    .then(versions => {
      callback(null, Object.assign({}, episode, { versions }))
    })
    .catch(error => callback(error))
  },
  objectMode: true
})
