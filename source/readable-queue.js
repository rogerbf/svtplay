const { Readable } = require(`readable-stream`)

module.exports = (source = [], queue = [ ...source ]) => {
  const readable = new Readable({ objectMode: true })
  readable._read = () => {
    const next = queue.shift() || null
    readable.push(next)
  }
  return readable
}
