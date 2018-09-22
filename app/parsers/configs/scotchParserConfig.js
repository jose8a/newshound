// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: ".card",
  itemHtmlAttribute: "h2 > a",
  linkType: "inner",
  siteAlias: "scotch",
  siteUrl: "https://scotch.io/",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return "https://scotch.io" + linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    let uriPathEnd = linkItem.attr("href").split('/').pop().split('-').slice(0,25).join('');
    return "scotch-" + uriPathEnd;
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// export site-parser configs
module.exports = siteItemParserConfigs;
