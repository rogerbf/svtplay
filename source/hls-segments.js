// https://tools.ietf.org/html/draft-pantos-http-live-streaming-06#page-4

module.exports = m3u8 =>
  m3u8.split(`\n`)
  .map(line => line.trim())
  .filter(line => line[0] !== `#`)
