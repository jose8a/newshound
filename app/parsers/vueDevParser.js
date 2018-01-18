let vuedevs = "https://vuejsdevelopers.com/";
let request = require('request');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create vuedevs-specific properties parser
let vuedevsPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return "https://vuejsdevelopers.com" + linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    // VueDevs has no ID for articles, so we'll construct one from the url
    const siteId = linkItem.attr("href").split('/').join('').trim();
    return "vuedevs-" + siteId;
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  }
}

// 2. create a vuedevsItemParser from the generic newsItemParser in
//    order to assign vuedevs-specific properties to it
let vuedevsItemParser = Object.create(newsItemParser);
vuedevsItemParser.init("article.post", "h2 > a", "vue-devs");

// 3. merge both objects into the vuedevsItemParser object using
//    Object.assign(..)
vuedevsItemParser = Object.assign(vuedevsItemParser, vuedevsPropertiesExtractor)

// 4. create a vuedevsSiteParser to handle and orchestrate the actual parsing
//    on the site
let vuedevsSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchVueDevsStories = function(req, res) {
  request(vuedevs, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      vuedevsSiteParser.init(html, vuedevsItemParser);
      vuedevsSiteParser.parseCollection();

      res.status(200).json(vuedevsSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchVueDevsStories;
