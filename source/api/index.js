const fetch = require(`node-fetch`)
const { escape } = require(`querystring`)
const endpoints = require(`./endpoints`)
const { parse } = require(`url`)

const request = (url, query = {}) =>
  fetch(
    Object.keys(query).reduce((updatedUrl, parameterName) =>
      updatedUrl.replace(`{${parameterName}}`, escape(query[parameterName])),
      url
    ),
    { headers: { 'user-agent': `Jerring` } }
  )
  .then(response => response.json())

module.exports = endpoints.reduce((api, endpoint) => {
  switch (endpoint.constructor.name) {
    case `String`:
      const { pathname } = parse(endpoint)
      const key = (
        pathname
        .slice(pathname.lastIndexOf(`/`) + 1)
        .replace(/_./g, match => match.slice(1).toUpperCase())
      )
      return Object.assign(api, { [key]: request.bind(null, endpoint) })
    case `Array`:
      return Object.assign(
        api, { [endpoint[0]]: request.bind(null, endpoint[1]) }
      )
  }
}, {})
