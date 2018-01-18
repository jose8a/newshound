let cssTricks = "https://css-tricks.com/";
let request = require('request');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create css-tricks-specific properties parser
let cssTricksPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return "csstrix-" + itemContainer.attr("id").split('-')[1];
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}


// 2. create a cssTricksItemParser from the generic newsItemParser in
//    order to assign css-tricks-specific properties to it
let cssTricksItemParser = Object.create(newsItemParser);
cssTricksItemParser.init(".article-card", "h2 > a", "css-tricks");

// 3. merge both objects into the cssTricksItemParser object using
//    Object.assign(..)
cssTricksItemParser = Object.assign(cssTricksItemParser, cssTricksPropertiesExtractor)

// 4. create a cssTricksSiteParser to handle and orchestrate the actual parsing
//    on the site
let cssTricksSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchCSSTricksStories = function(req, res) {
  request(cssTricks, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      cssTricksSiteParser.init(html, cssTricksItemParser);
      cssTricksSiteParser.parseCollection();

      res.status(200).json(cssTricksSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchCSSTricksStories;
