const resolveUrl = require(`./resolve-url`)
const { video } = require(`./svtplay-api`)

const playContent = async url => {
  const episode = await resolveUrl(url)
  const versions = await Promise.all(
    episode.versions.map(({ id }) => video({ id }))
  )

  const metadata = {
    ...episode,
    versions: episode.versions.reduce(
      (acc, version, i) => acc.concat({ ...version, ...versions[i] }),
      []
    )
  }

  const download = (
    options = { output: ``, version: ``, bitrate: 0 },
    output = options.output || process.cwd(),
    version = options.version || metadata.versions[0],
    bitrate = options.bitrate || Number.MAX_SAFE_INTEGER
  ) => {

  }

  return Object.assign(
    Object.create({ constructor: playContent }),
    {
      metadata,
      toJSON: JSON.stringify.bind(null, metadata)
    }
  )
}

module.exports = playContent
