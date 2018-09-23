let fetchSiteItems = require("../parsers/parserActions");

let vueDevConfigs = require("./configs/vueDevParserConfig");
let vueGatorConfigs = require("./configs/vueGatorParserConfig");
let vueRedditConfigs = require("./configs/vueRedditParserConfig");

module.exports = async function() {
  let results = [];
  let response = [];

  results = await Promise.all([
    fetchSiteItems(vueDevConfigs),
    fetchSiteItems(vueGatorConfigs),
    fetchSiteItems(vueRedditConfigs),
  ]);

  results.forEach((list) => {
    response = response.concat(list);
  });

  return response;
}
