const parseValue = (attribute, value) => {
  const attributes = {
    RESOLUTION: value => {
      const [ x, y ] = value.split(`x`).map(v => parseInt(v, 10))
      return { x, y }
    },
    BANDWIDTH: value => parseInt(value, 10)
  }

  return (
    [ value ]
    .map(v => v.replace(/"/g, ``).split(`,`))
    .map(v => v.length === 1 ? v.pop() : v)
    .map(v =>
      attributes.hasOwnProperty(attribute)
      ? attributes[attribute](v)
      : v
    )
    .pop()
  )
}

const parseAttributeList = line =>
  line.slice(line.indexOf(`:`) + 1)
  .split(/,(?=[A-Z])/)
  .reduce((all, attributeValue) => {
    const [ attribute, value ] = attributeValue.split(`=`)
    return Object.assign(
      all,
      { [attribute]: parseValue(attribute, value) }
    )
  }, {})

module.exports = (m3u8 = ``) =>
  m3u8.split(`\n`)
  .slice(2)
  .filter(line => line.length > 0)
  .reduce(
    (all, line) =>
      /^#EXT-X-STREAM-INF/.test(line)
      ? [ ...all, parseAttributeList(line) ]
      : [
        ...all.slice(0, -1),
        Object.assign({}, all.slice(-1).pop(), { URI: line })
      ],
    []
  )
