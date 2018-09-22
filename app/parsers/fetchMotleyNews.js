let fetchSiteItems = require("./parserActions");

let hnewsConfigs = require("./configs/hnewsParserConfig");
let reutersConfigs = require("./configs/reutersParserConfig");
let topMediumConfigs = require("./configs/topMediumParserConfig");

module.exports = async function() {
  let results = [];
  let response = [];

  results = await Promise.all([
    fetchSiteItems(hnewsConfigs),
    fetchSiteItems(reutersConfigs),
    fetchSiteItems(topMediumConfigs)
  ]);

  results.forEach((list) => {
    response = response.concat(list);
  });

  return response;
}
