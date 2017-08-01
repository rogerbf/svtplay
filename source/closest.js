module.exports = (list, n) =>
  [ ...list ]
  .map(x => Object.assign(x, { distance: Math.abs(x - n) }))
  .sort((a, b) =>
    a.distance === b.distance
    ? a.valueOf() > b.valueOf() ? -1 : 1
    : a.distance > b.distance ? 1 : -1
  )
  .slice(0, 1)
  .pop()
  .valueOf()
