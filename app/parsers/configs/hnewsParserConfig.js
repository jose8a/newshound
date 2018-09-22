// Create a site-specific single-item properties parser
let siteItemParserConfigs = {
  collectionHtmlAttribute: "tr.athing",
  itemHtmlAttribute: "td.title > a",
  linkType: "inner",
  siteAlias: "hnews",
  siteUrl: "https://news.ycombinator.com/",
  extractTitle: function(itemContainer, linkItem) {
    return linkItem.text().trim();
  },
  extractUrl: function(itemContainer, linkItem) {
    const baseUrl = this.siteUrl;

    // AskHN urls are relative to HN, and need a base/host
    // to be proper hardlinks
    const linkUrl = linkItem.attr("href");
    if (/http/.test(linkUrl)) {
      return linkItem.attr("href");
    }

    return baseUrl + linkItem.attr("href");
  },
  extractId: function(itemContainer, linkItem) {
    return "hnews-" + itemContainer.attr("id");
  },
  extractRank: function(itemContainer, linkItem, rank) {
    return rank;
  },
}

module.exports = siteItemParserConfigs;
