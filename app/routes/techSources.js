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
let fetchFEFStories = require("../parsers/feFrontParser");
let fetchEchoStories = require("../parsers/echoParser");
let fetchCSSTricksStories = require("../parsers/cssTricksParser");
// --- let fetchDevToStories = require("../parsers/devToParser");
// --- let fetchScotchStories = require("../parsers/scotchParser");
// --- let fetchPerfRocksStories = require("../parsers/perfRocksParser");

module.exports = function(router) {
  // get a collection of all my available stories from all sources
  router.get('/', (req, res, next) => {
    console.log("ALL AVAILABLE TECH ARTICLES - path: '/tech/'");
    res.status(200).json({stories: {fefront: "tbd", echo: "tbd", csstricks: "tbd", devto: "tbd", scotch: "tbd", perfrocks: "tbd"}});
  });

  // get list of all available tech sources
  router.get('/list', (req, res, next) => {
    console.log("ALL AVAILABLE SOURCES - path: '/tech/list'");
    res.status(200).json({sources: ['fefront', 'echo', 'css-tricks', 'dev-to', 'scotch', 'perf-rocks']});
  });

  // get list of all stories available on FEFront front-page
  router.get('/fefront', (req, res, next) => {
    console.log("FEFRONT ARTICLES - path: '/tech/fefront'");
    // --- res.status(200).send('TODO: Implementation not yet complete.');
    fetchFEFStories(req, res);
  });

  // get list of all stories available on EchoJS front-page
  router.get('/echo', (req, res, next) => {
    console.log("ECHO ARTICLES - path: '/tech/echo'");
    // --- res.status(200).send('TODO: Implementation not yet complete.');
    fetchEchoStories(req, res);
  });

  // get list of all stories available on CSS Tricks front-page
  router.get('/css-tricks', (req, res, next) => {
    console.log("CSS TRICKS ARTICLES - path: '/tech/css-tricks'");
    fetchCSSTricksStories(req, res);
  });

  // get list of all stories available on DevTo front-page
  router.get('/dev-to', (req, res, next) => {
    console.log("DEVTO ARTICLES - path: '/tech/dev-to'");
    res.status(200).send('TODO: Implementation not yet complete.');
    // --- fetchDevToStories(req, res);
  });

  // get list of all stories available on ScotchIO front-page
  router.get('/scotch', (req, res, next) => {
    console.log("SCOTCHIO ARTICLES - path: '/tech/scotch'");
    res.status(200).send('TODO: Implementation not yet complete.');
    // --- fetchScotchStories(req, res);
  });

  // get list of all stories available on Perf-Rocks front-page
  router.get('/perf-rocks', (req, res, next) => {
    console.log("PERF-ROCKS ARTICLES - path: '/tech/perf-rocks'");
    res.status(200).send('TODO: Implementation not yet complete.');
    // --- fetchPerfRocksStories(req, res);
  });
};
