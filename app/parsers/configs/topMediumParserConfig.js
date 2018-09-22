// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: ".postArticle",
  itemHtmlAttribute: ".postArticle-content > a",
  linkType: "inner",
  siteAlias: "top-medium",
  siteUrl: "https://medium.com/browse/top",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.find("h3.graf--title").text();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href").split('?')[0];
  },
  extractId: function(itemContainer, linkItem) {
    return "topmed-" + itemContainer.data("post-id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// export site-parser configs
module.exports = siteItemParserConfigs;
