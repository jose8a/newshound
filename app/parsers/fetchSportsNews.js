let fetchSiteItems = require("./parserActions");

let ringerConfigs = require("./configs/ringerParserConfig");
let siConfigs = require("./configs/sicomParserConfig");
let sbNationConfigs = require("./configs/sbnationParserConfig");
let cardNationConfigs = require("./configs/sbnCardParserConfig");

module.exports = async function() {
  let results = [];
  let response = [];

  results = await Promise.all([
    fetchSiteItems(ringerConfigs),
    fetchSiteItems(siConfigs),
    fetchSiteItems(sbNationConfigs),
    // fetchSiteItems(cardNationConfigs)
  ]);

  results.forEach((list) => {
    response = response.concat(list);
  });

  return response;
}
