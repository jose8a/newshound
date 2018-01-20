let fetchRingerStories = require("../parsers/ringerParser");
let fetchSIStories = require("../parsers/sicomParser");
let fetchSBNationStories = require("../parsers/sbnationParser");
let fetchSBNCardinalStories = require("../parsers/sbnCardParser");

module.exports = async function() {
  let results = [];
  let response = [];

  results = await Promise.all([
    fetchRingerStories(),
    fetchSIStories(),
    fetchSBNationStories(),
    fetchSBNCardinalStories()
  ]);

  results.forEach((list) => {
    response = response.concat(list);
  });

  return response;
}
