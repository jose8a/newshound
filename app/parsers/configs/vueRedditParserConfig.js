// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: ".thing",
  itemHtmlAttribute: "p.title > a",
  linkType: "inner",
  siteAlias: "reddit",
  siteUrl: "https://www.reddit.com/r/vuejs/",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    let url = linkItem.attr("href");

    if(itemContainer.hasClass('self')) {
      return "https://www.reddit.com" + url;
    }
    return url;
  },
  extractId: function(itemContainer, linkItem) {
    return "vueredd-" + itemContainer.attr("id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// export site-parser configs
module.exports = siteItemParserConfigs;
