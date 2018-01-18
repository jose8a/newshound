let sicom = "https://www.si.com/";
let request = require('request');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create sicom-specific properties parser
let sicomPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return "https://www.si.com" + linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    const id = linkItem.attr("href").split('/').slice(2, 21).join('-').split('-').join('').split('').slice(0, 35).join('');
    return "sicom-" + id;
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a sicomItemParser from the generic newsItemParser in
//    order to assign sicom-specific properties to it
let sicomItemParser = Object.create(newsItemParser);
sicomItemParser.init(".type-article", ".headline > a", "si-com");

// 3. merge both objects into the sicomItemParser object using
//    Object.assign(..)
sicomItemParser = Object.assign(sicomItemParser, sicomPropertiesExtractor)

// 4. create a sicomSiteParser to handle and orchestrate the actual parsing
//    on the site
let sicomSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchSIStories = function(req, res) {
  request(sicom, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      sicomSiteParser.init(html, sicomItemParser);
      sicomSiteParser.parseCollection();

      res.status(200).json(sicomSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchSIStories;
