const api = require(`./api`)

const resolve = require(`./resolve-url`).bind(null, api)

module.exports = {
  api,
  resolve
}
