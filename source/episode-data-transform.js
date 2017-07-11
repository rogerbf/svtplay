const { Transform } = require(`stream`)
const resolve = require(`./resolve-url`)

module.exports = new Transform({
  transform (url, encoding, callback) {
    resolve(url)
    .then(episode => {
      callback(null, episode)
    })
    .catch(error => callback(error))
  },
  objectMode: true
})
