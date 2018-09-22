// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: ".article-list__item",
  itemHtmlAttribute: "h2 > a",
  linkType: "inner",
  siteAlias: "perf.rocks",
  siteUrl: "http://perf.rocks/articles/",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    let uriPathEnd = linkItem.attr("href").split('/').reverse().slice(1,2).join();
    uriPathEnd = uriPathEnd.split('.').join('-');
    uriPathEnd = uriPathEnd.split('#').join('-');
    return "perf-" + uriPathEnd.split('-').join('');
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// export site-parser configs
module.exports = siteItemParserConfigs;
