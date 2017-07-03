const endpoints = require(`./api-endpoints`)
const request = require(`./request`)

module.exports = {
  get: Object.keys(endpoints).reduce((bound, endpoint) =>
    Object.assign(bound, { [endpoint]: request.bind(null, endpoints[endpoint]) }),
    {}
  )
}
