// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: "article.post",
  itemHtmlAttribute: "h2 > a",
  linkType: "inner",
  siteAlias: "vue-devs",
  siteUrl: "https://vuejsdevelopers.com/",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return "https://vuejsdevelopers.com" + linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    // VueDevs has no ID for articles, so we'll construct one from the url
    const siteId = linkItem.attr("href").split('/').join('').trim();
    return "vuedevs-" + siteId;
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  }
}

// export site-parser configs
module.exports = siteItemParserConfigs;
