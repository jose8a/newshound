let sbnation = "https://www.sbnation.com/";
let rp = require('request-promise');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create sbnation-specific properties parser
let sbnationPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return "sbnation-" + itemContainer.data("chorus-optimize-id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a sbnationItemParser from the generic newsItemParser in
//    order to assign sbnation-specific properties to it
let sbnationItemParser = Object.create(newsItemParser);
sbnationItemParser.init(".c-entry-box--compact--article", "h2 > a", "sbnation");

// 3. merge both objects into the sbnationItemParser object using
//    Object.assign(..)
sbnationItemParser = Object.assign(sbnationItemParser, sbnationPropertiesExtractor)

// 4. create a sbnationSiteParser to handle and orchestrate the actual parsing
//    on the site
let sbnationSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchSBNationStories = async function() {
  let parsedItems = [];

  await rp(sbnation, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      sbnationSiteParser.init(html, sbnationItemParser);
      sbnationSiteParser.parseCollection();

      parsedItems = sbnationSiteParser.getParsedItems();
    }
  });

  return parsedItems;
};

module.exports = fetchSBNationStories;
