var devToHtml = "https://dev.to/";
let rp = require('request-promise');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create devTo-specific properties parser
let devtoPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.find("h3").text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return "https://dev.to" + linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return "devto-" + linkItem.attr("id").split('-')[2];
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a devtoItemParser from the generic newsItemParser in
//    order to assign devTo-specific properties to it
let devtoItemParser = Object.create(newsItemParser);
devtoItemParser.init(".single-article", "a.index-article-link", "dev-to");

// 3. merge both objects into the devtoItemParser object using
//    Object.assign(..)
devtoItemParser = Object.assign(devtoItemParser, devtoPropertiesExtractor)

// 4. create a devtoSiteParser to handle and orchestrate the actual parsing
//    on the site
let devtoSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchDevToStories = async function() {
  let parsedItems = [];

  await rp(devToHtml, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      devtoSiteParser.init(html, devtoItemParser);
      devtoSiteParser.parseCollection();

      parsedItems = devtoSiteParser.getParsedItems();
    }
  });

  return parsedItems;
};

module.exports = fetchDevToStories;
