// https://tools.ietf.org/html/draft-pantos-http-live-streaming-06#page-4
const { get } = require(`http`)
const getP = options => new Promise((resolve, reject) => {
  try {
    get(options, response => {
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
const concatP = stream => new Promise((resolve, reject) => {
  stream.on(`error`, error => {
    reject(error)
    stream.resume()
  })
  stream.pipe(concat(resolve))
})
const { URL } = require(`url`)

module.exports = async url => {
  const response = await getP(url)
  response.setEncoding(`utf8`)
  const data = await concatP(response)

  return (
    data.split(`\n`)
    .map(line => line.trim())
    .filter(line => line.slice(0, 1) !== `#`)
    .filter(line => line.length > 0)
    .map(segment => new URL(segment, url).toString())
  )
}
