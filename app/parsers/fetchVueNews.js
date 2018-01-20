let fetchVueDevStories = require("../parsers/vueDevParser");
let fetchVueGatorStories = require("../parsers/vueGatorParser");
let fetchVueRedditStories = require("../parsers/vueRedditParser");

module.exports = async function() {
  let results = [];
  let response = [];

  results = await Promise.all([
    fetchVueDevStories(),
    fetchVueGatorStories(),
    fetchVueRedditStories(),
  ]);

  results.forEach((list) => {
    response = response.concat(list);
  });

  return response;
}
