const parseAttributeList = line =>
  line.slice(line.indexOf(`:`) + 1)
  .split(/,(?=[A-Z])/)
  .reduce((all, attributeValue) => {
    const [ attribute, value ] = attributeValue.split(`=`)
    return Object.assign(all, { [attribute]: value })
  }, {})

module.exports = (m3u8 = ``) =>
  m3u8.split(`\n`)
  .slice(2)
  .filter(line => line.length > 0)
  .reduce((all, line) =>
    /^#EXT-X-STREAM-INF/.test(line)
    ? [ ...all, parseAttributeList(line) ]
    : [ ...all.slice(0, -1), Object.assign({}, all.slice(-1).pop(), { URI: line }) ]
  , [])
