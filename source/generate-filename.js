const titleType = {
  MOVIE: ({ programTitle, year }) =>
    `${programTitle.replace(/\s/g, `.`)}.${year}.WEB-DL`,
  SERIES_OR_TV_SHOW: ({ programTitle, season, episodeNumber, year }) =>
    `${programTitle.replace(/\s/g, `.`)}.${year}.S${season}E${episodeNumber}.WEB-DL`
}

module.exports = video => {
  try {
    return titleType[video.titleType](video)
  } catch (error) {
    return video.id
  }
}
