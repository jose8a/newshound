let fetchFEFStories = require("../parsers/feFrontParser");
let fetchEchoStories = require("../parsers/echoParser");
let fetchCSSTricksStories = require("../parsers/cssTricksParser");
let fetchDevToStories = require("../parsers/devtoParser");
let fetchScotchStories = require("../parsers/scotchParser");
let fetchPerfRocksStories = require("../parsers/perfRocksParser");

module.exports = async function() {
  let results = [];
  let response = [];

  results = await Promise.all([
    fetchFEFStories(),
    fetchEchoStories(),
    fetchScotchStories(),
    fetchPerfRocksStories(),
    // fetchCSSTricksStories(),
    // fetchDevToStories(),
  ]);

  results.forEach((list) => {
    response = response.concat(list);
  });

  return response;
}
