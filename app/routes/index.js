const sportsSources = require('./sportsSources');
const techSources = require('./techSources');
const motleySources = require('./motleySources');
const vueSources = require('./vuejsSources');

module.exports = function(app, express) {
  // --- Create the high-level routers
  const sportsRouter = express.Router();
  const techRouter = express.Router();
  const motleyRouter = express.Router();
  const vueRouter = express.Router();

  // --- Register (to APP) and map routers to respective sub-paths
  app.use('/sports', sportsRouter);
  app.use('/tech', techRouter);
  app.use('/motley', motleyRouter);
  app.use('/vue', vueRouter);

  // --- Add endpoint handlers to each router
  sportsSources(sportsRouter);
  techSources(techRouter);
  motleySources(motleyRouter);
  vueSources(vueRouter);
};
