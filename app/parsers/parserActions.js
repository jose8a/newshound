let rp = require('request-promise');
let newsItemParser = require('./newsItemParser');
let collectionParser = require('./siteParser')


// ===========================================================================
// Parse Executers
// ===========================================================================
// Create and instantiate a `siteItemParer` object
let createSiteItemParser = function(siteItemParserConfigs) {
  let { collectionHtmlAttribute, itemHtmlAttribute, siteAlias, linkType } = siteItemParserConfigs;

  // create a site-specific siteItemParser from the generic
  // newsItemParser in order to assign site-item-specific properties to it
  let siteItemParser = Object.create(newsItemParser);
  siteItemParser.init(collectionHtmlAttribute, itemHtmlAttribute, siteAlias, linkType);

  // merge both objects into the siteItemParser object using
  // Object.assign(..)
  siteItemParser = Object.assign(siteItemParser, siteItemParserConfigs)

  return siteItemParser;
}

// use the parser in conjunction with cheerio and request/request to
// retrieve stories from the site
module.exports = async function(siteItemParserConfigs) {
  let parsedItems = [];
  let { siteUrl } = siteItemParserConfigs;

  // create and instanstiate a siteItemParser to handle and to
  // orchestrate the actual parsing of attributes from each item
  // in the collection
  let siteItemParser = createSiteItemParser(siteItemParserConfigs);

  // create and instanstiate a siteCollectionParser to handle and to
  // orchestrate the actual parsing on the site
  let siteCollectionParser = Object.create(collectionParser);

  await rp(siteUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      siteCollectionParser.init(html, siteItemParser);
      siteCollectionParser.parseCollection();

      parsedItems = siteCollectionParser.getParsedItems();
    }
  });

  return parsedItems;
};

