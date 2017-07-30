module.exports = m3u8 =>
  m3u8.split(`\n`)
  .map(line => line.trim())
  .filter(line => line[0] !== `#`)
