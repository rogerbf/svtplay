const titleTypes = {
  MOVIE: ({ programTitle, year }) => `${programTitle}.${year}`,
  SERIES_OR_TV_SHOW: ({ programTitle, season, episodeNumber, year }) =>
    `${programTitle}.${year}.S${season}E${episodeNumber}`
}

module.exports = video => {
  try {
    return titleTypes[video.titleType](video)
  } catch (error) {
    return video.id
  }
}
