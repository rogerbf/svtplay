const http = require(`http`)
const https = require(`https`)

const get = options => new Promise((resolve, reject) => {
  const isHttps = (
    (options.constructor.name === `String` && options.slice(0, 6) === `https:`) ||
    options.protocol === `https:`
  )

  const request = isHttps ? https.get : http.get

  try {
    request(options, response => {
      if (response.statusCode !== 200) {
        reject(response.statusCode)
        response.resume()
      } else {
        resolve(response)
      }
    })
  } catch (error) {
    reject(error)
  }
})

const concat = require(`concat-stream`)
const concatPromisified = stream => new Promise((resolve, reject) => {
  stream.on(`error`, error => {
    reject(error)
    stream.resume()
  })
  stream.pipe(concat(resolve))
})

module.exports = async options => {
  const response = await get(options)
  response.setEncoding(`utf8`)
  const body = await concatPromisified(response)
  return body
}
