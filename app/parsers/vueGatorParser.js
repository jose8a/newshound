let gator = "https://alligator.io/vuejs/";
let rp = require('request-promise');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create gator-specific properties parser
let gatorPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.find('h3').text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    // Vue Gator has no article IDs, so we construct one from the url
    let siteId = linkItem.attr("href").split('/').slice(1).join('-').trim();
    siteId = siteId.split('.').join('-');
    siteId = siteId.split('#').join('-');
    return "gator-" + siteId;
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
let fetchVueGatorStories = async function() {
  let parsedItems = [];

  await rp(gator, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      gatorSiteParser.init(html, gatorItemParser);
      gatorSiteParser.parseCollection();

      parsedItems = gatorSiteParser.getParsedItems();
    }
  });

  return parsedItems;
};

module.exports = fetchVueGatorStories;
