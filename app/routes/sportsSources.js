// =================================================================
// '/sports/'             -- Returns all stories available from all sports sources
// '/sports/list'         -- Returns a list of the available sports news sources available via the API
// '/sports/the-ringer'   -- Returns all the stories available from The Ringer front page
// '/sports/si-com'       -- Returns all the stories available from SI.com front page
// '/sports/sbnation'     -- Returns all the stories available from SBNation front page
// '/sports/sbn-card'     -- Returns all the stories available from Rule of Tree front page
//
// =================================================================
let fetchRingerStories = require("../parsers/ringerParser");
let fetchSIStories = require("../parsers/sicomParser");
let fetchSBNationStories = require("../parsers/sbnationParser");
let fetchSBNCardinalStories = require("../parsers/sbnCardParser");

module.exports = function(router) {
  // get a collection of all my available stories from all sources
  router.get('/', (req, res, next) => {
    console.log("ALL AVAILABLE SPORTS STORIES - path: '/sports/'");
    res.status(200).json({stories: {sicom: "tbd", sbnation: "tbd", ringer: "tbd", sbncard: "tbd"}});
  });

  // get list of all available news sources
  router.get('/list', (req, res, next) => {
    console.log("ALL AVAILABLE SOURCES - path: '/sports/list'");
    res.status(200).json({sources: ['the-ringer', 'si-com', 'sbnation', 'sbn-card']});
  });

  // get list of all stories available on The Ringer front-page
  router.get('/the-ringer', (req, res, next) => {
    console.log("THE RINGER STORIES - path: '/sports/the-ringer'");
    fetchRingerStories(req, res);
  });

  // get list of all stories available on SI.com front-page
  router.get('/si-com', (req, res, next) => {
    console.log("SI-COM STORIES - path: '/sports/si-com'");
    fetchSIStories(req, res);
  });

  // get list of all stories available on SBNation front-page
  router.get('/sbnation', (req, res, next) => {
    console.log("SBNATION STORIES - path: '/sports/sbnation'");
    fetchSBNationStories(req, res);
  });

  // get list of all stories available on SBNation front-page
  router.get('/sbn-card', (req, res, next) => {
    console.log("RULE of TREE STORIES - path: '/sports/sbn-card'");
    fetchSBNCardinalStories(req, res);
  });
};



