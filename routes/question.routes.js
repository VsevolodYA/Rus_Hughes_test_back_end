const questionRouter = require('express').Router();
const answerRoutes = require('./answer.routes');
const QuestionModel = require('../database/models/question.model');
const QuestionController = require('../controllers/question.controller');
const FieldsMiddleware = require('../middlewares/fields.middleware');
const existsMiddleware = require('../middlewares/exists.middleware');
/**
 * Question's endpoint middleware list.
 */
questionRouter.post('/', (...args) => FieldsMiddleware.checkRequired(...args, ['content']));
questionRouter
  .route('/:id')
  .all((...args) => existsMiddleware(QuestionModel, ...args))
  .post((...args) => FieldsMiddleware.checkRequired(...args, ['content']));

/**
 * Question's endpoint list.
 */
questionRouter
  .route('/')
  .get((req, res) => QuestionController.all(req, res))
  .post((req, res) => QuestionController.create(req, res));

questionRouter
  .route('/:id')
  .get((req, res) => QuestionController.show(req, res))
  .post((req, res) => QuestionController.update(req, res))
  .delete((req, res) => QuestionController.destroy(req, res));

questionRouter.use('/', answerRoutes);

module.exports = questionRouter;
