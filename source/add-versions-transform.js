const { Transform } = require(`readable-stream`)
const { video } = require(`./api`)

module.exports = new Transform({
  transform: (episode, encoding, callback) => {
    Promise.all(episode.versions.map(({ id }) => video({ id })))
    .then(versions => {
      callback(
        null,
        Object.assign(
          {},
          episode,
          {
            versions: episode.versions.reduce((acc, version, i) => {
              return acc.concat(Object.assign({}, version, versions[i]))
            }, [])
          }
        )
      )
    })
    .catch(error => callback(error))
  },
  objectMode: true
})
