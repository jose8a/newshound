// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: ".vuejs-teaser",
  itemHtmlAttribute: "a",
  linkType: "container",
  siteAlias: "gator",
  siteUrl: "https://alligator.io/vuejs/",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.find('h3').text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    // Vue Gator has no article IDs, so we construct one from the url
    let siteId = linkItem.attr("href").split('/').slice(1).join('-').trim();
    siteId = siteId.split('.').join('-');
    siteId = siteId.split('#').join('-');
    return "gator-" + siteId;
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// export site-parser configs
module.exports = siteItemParserConfigs;
