// =================================================================
// '/motley/'             -- Returns all stories available from all motley sources
// '/motley/list'         -- Returns a list of the available motley news sources available via the API
// '/motley/hnews'        -- Returns all the stories available from HNEWS front page
// '/motley/reuters'      -- Returns all the stories available from Reuters front page
// '/motley/top-medium'   -- Returns all the stories available from Top-Medium front page
//
// =================================================================
let fetchHNewsStories = require("../parsers/hnewsParser");
let fetchReutersStories = require("../parsers/reutersParser");
let fetchTopMediumStories = require("../parsers/topMediumParser");

module.exports = function(router) {
  // get a collection of all my available stories from all sources
  router.get('/', (req, res, next) => {
    console.log("ALL AVAILABLE MOTLEY NEWS ARTICLES - path: '/motley/'");
    res.status(200).json({stories: {hnews: "tbd", reuters: "tbd", topMedium: "tbd"}});
  });

  // get list of all available motley sources
  router.get('/list', (req, res, next) => {
    console.log("ALL AVAILABLE MOTLEY SOURCES - path: '/motley/list'");
    res.status(200).json({sources: ['hnews', 'reuters', 'top-medium']});
  });

  // get list of all stories available on HackerNews front-page
  router.get('/hnews', (req, res, next) => {
    console.log("HNEWS ARTICLES - path: '/motley/hnews'");
    fetchHNewsStories(req, res);
  });

  // get list of all stories available on EchoJS front-page
  router.get('/reuters', (req, res, next) => {
    console.log("REUTERS ARTICLES - path: '/motley/reuters'");
    fetchReutersStories(req, res);
  });

  // get list of all stories available on CSS Tricks front-page
  router.get('/top-medium', (req, res, next) => {
    console.log("MEDIUM-TOP ARTICLES - path: '/motley/top-medium'");
    fetchTopMediumStories(req, res);
  });
};
