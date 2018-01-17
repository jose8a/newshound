let hnews = "https://news.ycombinator.com/";
let request = require('request');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create hnews-specific properties parser
let hnewsPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    const baseUrl = hnews;

    // AskHN urls are relative to HN, and need a base/host
    // to be proper hardlinks
    const linkUrl = linkItem.attr("href");
    if (/http/.test(linkUrl)) {
      return linkItem.attr("href");
    }

    return baseUrl + linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return itemContainer.attr("id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a hnewsItemParser from the generic newsItemParser in
//    order to assign hnews-specific properties to it
let hnewsItemParser = Object.create(newsItemParser);
hnewsItemParser.init("tr.athing", "td.title > a", "hnews");

// 3. merge both objects into the hnewsItemParser object using
//    Object.assign(..)
hnewsItemParser = Object.assign(hnewsItemParser, hnewsPropertiesExtractor)

// 4. create a hnewsSiteParser to handle and orchestrate the actual parsing
//    on the site
let hnewsSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchHNewsStories = function(req, res) {
  request(hnews, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      hnewsSiteParser.init(html, hnewsItemParser);
      hnewsSiteParser.parseCollection();

      res.status(200).json(hnewsSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchHNewsStories;
