module.exports = (m3u8 = ``) =>
  m3u8.split(`\n`)
  .slice(2)
  .filter(line => line.length > 0)
