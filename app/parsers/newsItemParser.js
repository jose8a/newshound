let format = require('date-fns/format');

NewsItemParser = {
  init: function(typeSelector, linkSelector, source, linkType) {
    this.storyProperties = {};

    this.linkType = linkType || 'inner';
    this.source = source;
    this.linkSelector = linkSelector;
    this.collectionSelector = typeSelector;
  },
  getNewsItem: function() {
    return this.storyProperties;
  },
  getLinkSelector: function() {
    return this.linkSelector;
  },
  getCollectionSelector: function() {
    return this.collectionSelector;
  },
  getLinkItem: function(itemContainer, linkSelector) {
    // if type === 'inner', the link is embedded in the item container,
    //    else, it is attached to the itemContainer itself
    let urlAnchor = itemContainer.find(linkSelector);

    if (this.linkType === 'inner') {
      // if linkSelector is not found within itemContainer, skip the
      // current list item.
      if (!urlAnchor.attr("href")) {
        return null;
      }

      return itemContainer.find(linkSelector);
    }

    return itemContainer;
  },
  parseItem: function(itemContainer, linkItem, rank) {
    // make sure to start with an empy object when parsing a news item
    this.storyProperties = {};

    this.storyProperties.source = this.source;
    this.storyProperties.title = this.extractTitle(itemContainer, linkItem);
    this.storyProperties.url =  this.extractUrl(itemContainer, linkItem);
    this.storyProperties.sourceId = this.extractId(itemContainer, linkItem);
    this.storyProperties.fetchDate = format( new Date(), 'YYYY-MM-DD');
    this.storyProperties.rank = this.extractRank(itemContainer, linkItem, rank);
  }

  // The following four methods should be an interface that is 'assigned'
  // to all siteParsers as the extraction of each of these items may
  // require a unique process for each site
  //    * extractTitle(itemContainer, linkItem)
  //    * extractUrl(itemContainer, linkItem)
  //    * extractId(itemContainer, linkItem)
  //    * extractRank(itemContainer, linkItem, rank)
}

module.exports = NewsItemParser;
