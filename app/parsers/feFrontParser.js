let fefront = "https://frontendfront.com/";
let request = require('request');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create fefront-specific properties parser
let feFrontPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return itemContainer.find(".story-vote > span.arrow").data("red-id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a feFrontItemParser from the generic newsItemParser in
//    order to assign fefront-specific properties to it
let feFrontItemParser = Object.create(newsItemParser);
feFrontItemParser.init(".stories-list > li", "h2 > a", "frontend-front");

// 3. merge both objects into the feFrontItemParser object using
//    Object.assign(..)
feFrontItemParser = Object.assign(feFrontItemParser, feFrontPropertiesExtractor)

// 4. create a feFrontSiteParser to handle and orchestrate the actual parsing
//    on the site
let feFrontSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchFEFStories = function(req, res) {
  request(fefront, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      feFrontSiteParser.init(html, feFrontItemParser);
      feFrontSiteParser.parseCollection();

      res.status(200).json(feFrontSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchFEFStories;
