let fetchHNewsStories = require("../parsers/hnewsParser");
let fetchReutersStories = require("../parsers/reutersParser");
let fetchTopMediumStories = require("../parsers/topMediumParser");

module.exports = async function() {
  let results = [];
  let response = [];

  results = await Promise.all([
    fetchHNewsStories(),
    fetchReutersStories(),
    fetchTopMediumStories(),
  ]);

  results.forEach((list) => {
    response = response.concat(list);
  });

  return response;
}
