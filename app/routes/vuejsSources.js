// =================================================================
// '/vue/'            -- Returns all stories available from all vuejs sources
// '/vue/list'        -- Returns a list of the available vuejs news sources available via the API
// '/vue/vuedevs'     -- Returns all the stories available from Vuejsdevelopers front page
// '/vue/gator'       -- Returns all the stories available from Alligator front page
// '/vue/reddit'      -- Returns all the stories available from Reddit/r/vuejs front page
//
// =================================================================
let fetchSiteItems = require("../parsers/parserActions");
let fetchAllVueNews = require("../parsers/fetchVueNews");

let vueDevConfigs = require("../parsers/configs/vueDevParserConfig");
let vueGatorConfigs = require("../parsers/configs/vueGatorParserConfig");
let vueRedditConfigs = require("../parsers/configs/vueRedditParserConfig");



module.exports = function(router) {
  // get a collection of all my available stories from all sources
  router.get('/', async (req, res, next) => {
    console.log("ALL AVAILABLE VUE ARTICLES - path: '/vue/'");

    const fetchedItems = await fetchAllVueNews();
    res.status(200).json(fetchedItems);
  });

  // get list of all available news sources
  router.get('/_meta', (req, res, next) => {
    console.log("ALL AVAILABLE VUE SOURCES - path: '/vue/list'");
    res.status(200).json({sources: ['vuedevs', 'gator', 'reddit']});
  });

  // get list of all stories available on Vuejsdevelopers front-page
  router.get('/vuedevs', async (req, res, next) => {
    console.log("VUEJSDEVELOPERS ARTICLES - path: '/vue/vuedevs'");

    const fetchedItems = await fetchSiteItems(vueDevConfigs);
    res.status(200).json(fetchedItems);
  });

  // get list of all stories available on Alligator front-page
  router.get('/gator', async (req, res, next) => {
    console.log("ALLIGATOR VUE ARTICLES - path: '/vue/gator'");

    const fetchedItems = await fetchSiteItems(vueGatorConfigs);
    res.status(200).json(fetchedItems);
  });

  // get list of all stories available on Reddit/r/vuejs front-page
  router.get('/reddit', async (req, res, next) => {
    console.log("VUE REDDIT ARTICLES - path: '/vue/reddit'");

    const fetchedItems = await fetchSiteItems(vueRedditConfigs);
    res.status(200).json(fetchedItems);
  });
};



