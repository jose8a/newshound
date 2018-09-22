// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: ".type-article",
  itemHtmlAttribute: ".headline > a",
  linkType: "inner",
  siteAlias: "si-com",
  siteUrl: "https://www.si.com/",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    return "https://www.si.com" + linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    const id = linkItem.attr("href").split('/').slice(2, 21).join('-').split('-').join('').split('').slice(0, 35).join('');
    return "sicom-" + id;
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

// export site-parser configs
module.exports = siteItemParserConfigs;
