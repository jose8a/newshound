let ringer = "https://www.theringer.com/";
let request = require('request');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create ringer-specific properties parser
let ringerPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return "ringer-" + itemContainer.data("chorus-optimize-id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a ringerItemParser from the generic newsItemParser in
//    order to assign ringer-specific properties to it
let ringerItemParser = Object.create(newsItemParser);
ringerItemParser.init(".c-entry-box--compact", "h2 > a", "the-ringer");

// 3. merge both objects into the ringerItemParser object using
//    Object.assign(..)
ringerItemParser = Object.assign(ringerItemParser, ringerPropertiesExtractor)

// 4. create a ringerSiteParser to handle and orchestrate the actual parsing
//    on the site
let ringerSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchRingerStories = function(req, res) {
  request(ringer, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      ringerSiteParser.init(html, ringerItemParser);
      ringerSiteParser.parseCollection();

      res.status(200).json(ringerSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchRingerStories;
