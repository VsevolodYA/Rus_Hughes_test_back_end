const router = require('express').Router();
const questionRoutes = require('./question.routes');

/**
 * Registering of the api routes.
 */
router.use('/questions', questionRoutes);

module.exports = router;
