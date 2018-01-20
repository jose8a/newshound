let topMedium = "https://medium.com/browse/top";
let rp = require('request-promise');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create topMedium-specific properties parser
let topMediumPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.find("h3.graf--title").text();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href").split('?')[0];
  },
  extractId: function(itemContainer, linkItem) {
    return "topmed-" + itemContainer.data("post-id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a topMediumItemParser from the generic newsItemParser in
//    order to assign topMedium-specific properties to it
let topMediumItemParser = Object.create(newsItemParser);
topMediumItemParser.init(".postArticle", ".postArticle-content > a", "top-medium");

// 3. merge both objects into the topMediumItemParser object using
//    Object.assign(..)
topMediumItemParser = Object.assign(topMediumItemParser, topMediumPropertiesExtractor)

// 4. create a topMediumSiteParser to handle and orchestrate the actual parsing
//    on the site
let topMediumSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchTopMediumStories = async function() {
  let parsedItems = [];

  await rp(topMedium, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      topMediumSiteParser.init(html, topMediumItemParser);
      topMediumSiteParser.parseCollection();

      parsedItems = topMediumSiteParser.getParsedItems();
    }
  });

  return parsedItems;
};

module.exports = fetchTopMediumStories;
