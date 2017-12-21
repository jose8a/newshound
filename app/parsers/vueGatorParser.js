let gator = "https://alligator.io/vuejs/";
let request = require('request');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create gator-specific properties parser
let gatorPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    // --- TODO: FIXME: return itemContainer.data("chorus-optimize-id");
    return "1010";
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a gatorItemParser from the generic newsItemParser in
//    order to assign gator-specific properties to it
let gatorItemParser = Object.create(newsItemParser);
gatorItemParser.init(".vuejs-teaser", "a", "gator");

// 3. merge both objects into the gatorItemParser object using
//    Object.assign(..)
gatorItemParser = Object.assign(gatorItemParser, gatorPropertiesExtractor)
gatorItemParser.linkType = 'container';

// 4. create a gatorSiteParser to handle and orchestrate the actual parsing
//    on the site
let gatorSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchRingerStories = function(req, res) {
  request(gator, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      gatorSiteParser.init(html, gatorItemParser);
      gatorSiteParser.parseCollection();

      res.status(200).json(gatorSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchRingerStories;
