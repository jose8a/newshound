var scotch = "https://scotch.io/";
let request = require('request');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create scotch-specific properties parser
let scotchPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return "https://scotch.io" + linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    let uriPathEnd = linkItem.attr("href").split('/').pop().split('-').slice(0,25).join('');
    return "scotch-" + uriPathEnd;
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a scotchItemParser from the generic newsItemParser in
//    order to assign scotch-specific properties to it
let scotchItemParser = Object.create(newsItemParser);
scotchItemParser.init(".card", "h2 > a", "scotch");

// 3. merge both objects into the scotchItemParser object using
//    Object.assign(..)
scotchItemParser = Object.assign(scotchItemParser, scotchPropertiesExtractor)

// 4. create a scotchSiteParser to handle and orchestrate the actual parsing
//    on the site
let scotchSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchScotchStories = function(req, res) {
  request(scotch, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      scotchSiteParser.init(html, scotchItemParser);
      scotchSiteParser.parseCollection();

      res.status(200).json(scotchSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchScotchStories;
