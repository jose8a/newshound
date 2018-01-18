let reddit = "https://www.reddit.com/r/vuejs/";
let request = require('request');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')

// 1. create reddit-specific properties parser
let redditPropertiesExtractor = {
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    let url = linkItem.attr("href");

    if(itemContainer.hasClass('self')) {
      return "https://www.reddit.com" + url;
    }
    return url;
  },
  extractId: function(itemContainer, linkItem) {
    return "vueredd-" + itemContainer.attr("id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// 2. create a redditItemParser from the generic newsItemParser in
//    order to assign reddit-specific properties to it
let redditItemParser = Object.create(newsItemParser);
redditItemParser.init(".thing", "p.title > a", "reddit");

// 3. merge both objects into the redditItemParser object using
//    Object.assign(..)
redditItemParser = Object.assign(redditItemParser, redditPropertiesExtractor)

// 4. create a redditSiteParser to handle and orchestrate the actual parsing
//    on the site
let redditSiteParser = Object.create(collectionParser);

// 5. use the parser in conjunction with cheerio and request/request to
//    retrieve stories from the site
let fetchRingerStories = function(req, res) {
  request(reddit, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      redditSiteParser.init(html, redditItemParser);
      redditSiteParser.parseCollection();

      res.status(200).json(redditSiteParser.getParsedItems());
    }
  });
};

module.exports = fetchRingerStories;
