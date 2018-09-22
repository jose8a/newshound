// =================================================================
// '/motley/'             -- Returns all stories available from all motley sources
// '/motley/list'         -- Returns a list of the available motley news sources available via the API
// '/motley/hnews'        -- Returns all the stories available from HNEWS front page
// '/motley/reuters'      -- Returns all the stories available from Reuters front page
// '/motley/top-medium'   -- Returns all the stories available from Top-Medium front page
//
// =================================================================
let fetchSiteItems = require("../parsers/parserActions");
let fetchAllMotleyNews = require("../parsers/fetchMotleyNews");

let hnewsConfigs = require("../parsers/configs/hnewsParserConfig");
let reutersConfigs = require("../parsers/configs/reutersParserConfig");
let topMediumConfigs = require("../parsers/configs/topMediumParserConfig");


module.exports = function(router) {
  // get a collection of all my available stories from all sources
  router.get('/', async (req, res, next) => {
    console.log("ALL AVAILABLE MOTLEY NEWS ARTICLES - path: '/motley/'");

    const fetchedItems = await fetchAllMotleyNews();
    res.status(200).json(fetchedItems);
  });

  // get list of all available motley sources
  router.get('/_meta', (req, res, next) => {
    console.log("ALL AVAILABLE MOTLEY SOURCES - path: '/motley/list'");
    res.status(200).json({sources: ['hnews', 'reuters', 'top-medium']});
  });

  // get list of all stories available on HackerNews front-page
  router.get('/hnews', async (req, res, next) => {
    console.log("HNEWS ARTICLES - path: '/motley/hnews'");

    const fetchedItems = await fetchSiteItems(hnewsConfigs);
    res.status(200).json(fetchedItems);
  });

  // get list of all stories available on EchoJS front-page
  router.get('/reuters', async (req, res, next) => {
    console.log("REUTERS ARTICLES - path: '/motley/reuters'");

    const fetchedItems = await fetchSiteItems(reutersConfigs);
    res.status(200).json(fetchedItems);
  });

  // get list of all stories available on CSS Tricks front-page
  router.get('/top-medium', async (req, res, next) => {
    console.log("MEDIUM-TOP ARTICLES - path: '/motley/top-medium'");

    const fetchedItems = await fetchSiteItems(topMediumConfigs);
    res.status(200).json(fetchedItems);
  });
};
