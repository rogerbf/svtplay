const titleType = {
  MOVIE: ({ programTitle, year }, { id }) =>
    `${programTitle.replace(/\s/g, `.`)}.${year}.${id}`,
  SERIES_OR_TV_SHOW: ({ programTitle, season, episodeNumber, year }, { id }) =>
    `${programTitle.replace(/\s/g, `.`)}.${year}.S${season}E${episodeNumber}.${id}`
}

module.exports = (video, version) => {
  try {
    return titleType[video.titleType](video, version)
  } catch (error) {
    return video.id
  }
}
