const fetch = require(`node-fetch`)
const { escape } = require(`querystring`)

module.exports = (url, query = {}) =>
  fetch(
    Object.keys(query).reduce((updatedUrl, parameterName) =>
      updatedUrl.replace(`{${parameterName}}`, escape(query[parameterName])),
      url
    ),
    {
      headers: {
        'user-agent': `Jerring`
      }
    }
  )
  .then(response => response.json())
