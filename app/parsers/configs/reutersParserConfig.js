// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: "article.story",
  itemHtmlAttribute: ".story-content > a",
  linkType: "inner",
  siteAlias: "reuters",
  siteUrl: "https://www.reuters.com/",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return "https://www.reuters.com" + linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return "reuters-" + linkItem.attr("href").split('-').pop();
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// export site-parser configs
module.exports = siteItemParserConfigs;
