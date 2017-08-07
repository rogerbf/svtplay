// https://tools.ietf.org/html/draft-pantos-http-live-streaming-06#page-4
const get = require(`./get`)
const { URL } = require(`url`)

module.exports = async url => {
  const playlist = await get(url)

  return (
    playlist.split(`\n`)
    .map(line => line.trim())
    .filter(line => line.slice(0, 1) !== `#`)
    .filter(line => line.length > 0)
    .map(segment => new URL(segment, url).toString())
  )
}
