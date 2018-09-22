// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: ".c-entry-box--compact",
  itemHtmlAttribute: "h2 > a",
  linkType: "inner",
  siteAlias: "the-ringer",
  siteUrl: "https://www.theringer.com/",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return "ringer-" + itemContainer.data("chorus-optimize-id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// export site-parser configs
module.exports = siteItemParserConfigs;
