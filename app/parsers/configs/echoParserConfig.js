// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: "#newslist > article",
  itemHtmlAttribute: "h2 > a",
  linkType: "inner",
  siteAlias: "echojs",
  siteUrl: "http://www.echojs.com/",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return "echo-" + itemContainer.data("news-id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// export site-parser configs
module.exports = siteItemParserConfigs;
