let reuters = "https://www.reuters.com/";
let request = require('request');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create reuters-specific properties parser
let reutersPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return "https://www.reuters.com" + linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return linkItem.attr("href").split('-').pop();
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a reutersItemParser from the generic newsItemParser in
//    order to assign reuters-specific properties to it
let reutersItemParser = Object.create(newsItemParser);
reutersItemParser.init("article.story", ".story-content > a", "reuters");

// 3. merge both objects into the reutersItemParser object using
//    Object.assign(..)
reutersItemParser = Object.assign(reutersItemParser, reutersPropertiesExtractor)

// 4. create a reutersSiteParser to handle and orchestrate the actual parsing
//    on the site
let reutersSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchReutersStories = function(req, res) {
  request(reuters, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      reutersSiteParser.init(html, reutersItemParser);
      reutersSiteParser.parseCollection();

      res.status(200).json(reutersSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchReutersStories;
