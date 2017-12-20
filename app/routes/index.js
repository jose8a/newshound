const sportsSources = require('./sportsSources');
const techSources = require('./techSources');

module.exports = function(app, express) {
  // --- Create the high-level routers
  const sportsRouter = express.Router();
  const techRouter = express.Router();

  // --- Register (to APP) and map routers to respective sub-paths
  app.use('/sports', sportsRouter);
  app.use('/tech', techRouter);

  // --- Add endpoint handlers to each router
  sportsSources(sportsRouter);
  techSources(techRouter);
};
