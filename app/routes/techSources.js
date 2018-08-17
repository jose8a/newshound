// =================================================================
// '/tech/'             -- Returns all stories available from all tech sources
// '/tech/list'         -- Returns a list of the available tech news sources available via the API
// '/tech/fefront'      -- Returns all the stories available from FEFront front page
// '/tech/echo'         -- Returns all the stories available from EchoJS front page
// '/tech/css-tricks'   -- Returns all the stories available from CSS Tricks front page
// '/tech/dev-to'       -- Returns all the stories available from DevTo front page
// '/tech/scotch'       -- Returns all the stories available from ScotchIO front page
// '/tech/perf-rocks'   -- Returns all the stories available from Perf-Rocks front page
//
// =================================================================
let fetchAllTechNews = require("../parsers/fetchTechNews");
let fetchFEFStories = require("../parsers/feFrontParser");
let fetchEchoStories = require("../parsers/echoParser");
let fetchCSSTricksStories = require("../parsers/cssTricksParser");
let fetchDevToStories = require("../parsers/devtoParser");
let fetchScotchStories = require("../parsers/scotchParser");
let fetchPerfRocksStories = require("../parsers/perfRocksParser");

module.exports = function(router) {
  // get a collection of all my available stories from all sources
  router.get('/', async (req, res, next) => {
    console.log("ALL AVAILABLE TECH ARTICLES - path: '/tech/'");

    const fetchedItems = await fetchAllTechNews();
    res.status(200).json(fetchedItems);
  });

  // get list of all available tech sources
  router.get('/_meta', (req, res, next) => {
    console.log("ALL AVAILABLE SOURCES - path: '/tech/list'");
    res.status(200).json({sources: ['fefront', 'echo', 'css-tricks', 'dev-to', 'scotch', 'perf-rocks']});
  });

  // get list of all stories available on FEFront front-page
  router.get('/fefront', async (req, res, next) => {
    console.log("FEFRONT ARTICLES - path: '/tech/fefront'");

    const fetchedItems = await fetchFEFStories();
    res.status(200).json(fetchedItems);
  });

  // get list of all stories available on EchoJS front-page
  router.get('/echo', async (req, res, next) => {
    console.log("ECHO ARTICLES - path: '/tech/echo'");

    const fetchedItems = await fetchEchoStories();
    res.status(200).json(fetchedItems);
  });

  // ==================================================
  // 20180817 - disable CSS-Tricks parsing due to problems retrieving
  // and parsing in recent days - it breaks rest of the app
  //
  // --- // get list of all stories available on CSS Tricks front-page
  // --- router.get('/css-tricks', async (req, res, next) => {
  // ---   console.log("CSS TRICKS ARTICLES - path: '/tech/css-tricks'");

  // ---   const fetchedItems = await fetchCSSTricksStories();
  // ---   res.status(200).json(fetchedItems);
  // --- });
  // ==================================================

  // ==================================================
  // --- 20180817 - disable DevTo parsing due to low-value news
  // articles. Their articles rarely have much depth or new information
  // that other tech-article sites and blogs don't already churn out
  //
  // --- // get list of all stories available on DevTo front-page
  // --- router.get('/dev-to', async (req, res, next) => {
  // ---   console.log("DEVTO ARTICLES - path: '/tech/dev-to'");

  // ---   const fetchedItems = await fetchDevToStories();
  // ---   res.status(200).json(fetchedItems);
  // --- });
  // ==================================================

  // get list of all stories available on ScotchIO front-page
  router.get('/scotch', async (req, res, next) => {
    console.log("SCOTCHIO ARTICLES - path: '/tech/scotch'");
    // --- res.status(200).send('TODO: Implementation not yet complete.');

    const fetchedItems = await fetchScotchStories();
    res.status(200).json(fetchedItems);
  });

  // get list of all stories available on Perf-Rocks front-page
  router.get('/perf-rocks', async (req, res, next) => {
    console.log("PERF-ROCKS ARTICLES - path: '/tech/perf-rocks'");

    const fetchedItems = await fetchPerfRocksStories();
    res.status(200).json(fetchedItems);
  });
};
