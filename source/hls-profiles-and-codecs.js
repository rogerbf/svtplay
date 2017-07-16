// https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/StreamingMediaGuide/FrequentlyAskedQuestions/FrequentlyAskedQuestions.html

const profileCodecMap = Object.assign(
  Object.create(null),
  {
    'H.264': {
      Baseline: {
        Profile: {
          level: {
            '3.0': [ `avc1.42001e`, `avc1.66.30` ],
            '3.1': `avc1.42001f`
          }
        }
      },
      Main: {
        Profile: {
          level: {
            '3.0': [ `avc1.4d001e`, `avc1.77.30` ],
            '3.1': `avc1.4d001`,
            '4.0': `avc1.4d0028`
          }
        }
      },
      High: {
        Profile: {
          level: {
            '3.1': `avc1.64001f`,
            '4.0': `avc1.640028`,
            '4.1': `avc1.640029`
          }
        }
      }
    }
  }
)

const codecProfileMap = Object.assign(
  Object.create(null),
  {
    'mp4a.40.2': `AAC-LC`,
    'mp4a.40.5': `HE-AAC`,
    'mp4a.40.34': `MP3`,
    'avc1.42001e': `H.264 Baseline Profile level 3.0`,
    'avc1.66.30': `H.264 Baseline Profile level 3.0`,
    'avc1.42001f': `H.264 Baseline Profile level 3.1`,
    'avc1.4d001e': `H.264 Main Profile level 3.0`,
    'avc1.77.30': `H.264 Main Profile level 3.0`,
    'avc1.4d001': `H.264 Main Profile level 3.1`,
    'avc1.4d0028': `H.264 Main Profile level 4.0`,
    'avc1.64001f': `H.264 High Profile level 3.1`,
    'avc1.640028': `H.264 High Profile level 4.0`,
    'avc1.640029': `H.264 High Profile level 4.1`
  }
)

const getProfileName = (codec, profile = codecProfileMap[codec]) => profile || null

const getProfileNameShort = (getProfile, codec, profile = getProfile(codec)) =>
  profile !== null ? profile.slice(0, profile.indexOf(` `)) : null

const getCodec = profile => {
  try {
    return (
      profile
      .split(` `)
      .reduce((codec, nextKey) => codec[nextKey], profileCodecMap)
    )
  } catch (error) {
    return null
  }
}

module.exports = {
  getProfileName: Object.assign(
    getProfileName,
    { short: getProfileNameShort.bind(null, getProfileName) }
  ),
  getCodec
}
