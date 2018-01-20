let perfrocks = "http://perf.rocks/articles/";
let rp = require('request-promise');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create perfrocks-specific properties parser
let perfRocksPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    let uriPathEnd = linkItem.attr("href").split('/').reverse().slice(1,2).join();
    return "perf-" + uriPathEnd.split('-').join('');
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a perfRocksItemParser from the generic newsItemParser in
//    order to assign perfrocks-specific properties to it
let perfRocksItemParser = Object.create(newsItemParser);
perfRocksItemParser.init(".article-list__item", "h2 > a", "perf.rocks");

// 3. merge both objects into the perfRocksItemParser object using
//    Object.assign(..)
perfRocksItemParser = Object.assign(perfRocksItemParser, perfRocksPropertiesExtractor)

// 4. create a perfRocksSiteParser to handle and orchestrate the actual parsing
//    on the site
let perfRocksSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchPerfRocksStories = async function() {
  let parsedItems = [];

  await rp(perfrocks, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      perfRocksSiteParser.init(html, perfRocksItemParser);
      perfRocksSiteParser.parseCollection();

      parsedItems = perfRocksSiteParser.getParsedItems();
    }
  });

  return parsedItems;
};

module.exports = fetchPerfRocksStories;
