let echojs = "http://www.echojs.com/";
let request = require('request');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create echojs-specific properties parser
let echoPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return itemContainer.data("news-id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a echoItemParser from the generic newsItemParser in
//    order to assign echojs-specific properties to it
let echoItemParser = Object.create(newsItemParser);
echoItemParser.init("#newslist > article", "h2 > a", "echojs");

// 3. merge both objects into the echoItemParser object using
//    Object.assign(..)
echoItemParser = Object.assign(echoItemParser, echoPropertiesExtractor)

// 4. create a echoSiteParser to handle and orchestrate the actual parsing
//    on the site
let echoSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchEchoStories = function(req, res) {
  request(echojs, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      echoSiteParser.init(html, echoItemParser);
      echoSiteParser.parseCollection();

      res.status(200).json(echoSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchEchoStories;
