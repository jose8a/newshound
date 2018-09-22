// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: ".c-entry-box--compact--article",
  itemHtmlAttribute: "h2 > a",
  linkType: "inner",
  siteAlias: "cardnation",
  siteUrl: "https://www.ruleoftree.com/",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return "scard-" + itemContainer.data("chorus-optimize-id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// export site-parser configs
module.exports = siteItemParserConfigs;
