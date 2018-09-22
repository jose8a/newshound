// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: ".stories-list > li",
  itemHtmlAttribute: "h2 > a",
  linkType: "inner",
  siteAlias: "frontend-front",
  siteUrl: "https://frontendfront.com/",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return "fefront-" + itemContainer.find(".story-vote > span.arrow").data("red-id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// export site-parser configs
module.exports = siteItemParserConfigs;
