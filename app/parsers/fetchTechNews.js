let fetchSiteItems = require("../parsers/parserActions");

let fefConfigs = require("./configs/feFrontParserConfig");
let echoConfigs = require("./configs/echoParserConfig");
let scotchConfigs = require("./configs/scotchParserConfig");
let perfRocksConfigs = require("./configs/perfRocksParserConfig");
// let cssTricksConfigs = require("./configs/cssTricksParserConfig");


module.exports = async function() {
  let results = [];
  let response = [];

  results = await Promise.all([
    fetchSiteItems(fefConfigs),
    fetchSiteItems(echoConfigs),
    fetchSiteItems(scotchConfigs),
    fetchSiteItems(perfRocksConfigs),
    // fetchSiteItems(cssTricksConfigs),
  ]);

  results.forEach((list) => {
    response = response.concat(list);
  });

  return response;
}
