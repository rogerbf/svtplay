const fetch = require(`node-fetch`)
const cheerio = require(`cheerio`)
const { parse } = require(`url`)
const { episode, titleEpisodesByEpisodeArticleId } = require(`./svtplay-api`)

const videoIdRegex = /\/video\/(\d*)(?=\/)/

module.exports = url =>
  (
    parse(url).host === `www.svtplay.se`
    ? Promise.resolve(url)
    : Promise.reject(Error(`invalid hostname`))
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
          () => Promise.reject(Error(`invalid url`))
        )
      )
    }
  })
