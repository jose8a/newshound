const sportsSources = require('./sportsSources');

module.exports = function(app, express) {
  // --- Create the high-level routers
  var sportsRouter = express.Router();

  // --- Register (to APP) and map routers to respective sub-paths
  app.use('/sports', sportsRouter);

  // --- Add endpoint handlers to each router
  sportsSources(sportsRouter);
};
