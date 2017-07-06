const fetch = require(`node-fetch`)
const cheerio = require(`cheerio`)
const { parse } = require(`url`)

const videoIdRegex = /\/video\/(\d*)(?=\/)/

module.exports = async (
  { episode, titleEpisodesByEpisodeArticleId },
  url,
  singleEpisode = url.match(videoIdRegex)
) =>
  (
    parse(url).host === `www.svtplay.se`
    ? Promise.resolve(url)
    : Promise.reject(Error(`incompatible url, expected host svtplay.se`))
  )
  .then(url => {
    try {
      return episode({ articleId: url.match(videoIdRegex)[1] })
    } catch (error) {
      return (
        fetch(url)
        .then(response => response.text())
        .then(html =>
          cheerio.load(html)(`.play_titlepage__latest-video`)
          .attr(`href`)
          .match(videoIdRegex)[1]
        )
        .then(
          articleId => titleEpisodesByEpisodeArticleId({ articleId }),
          () => Promise.reject(Error(`incompatible url`))
        )
      )
    }
  })
