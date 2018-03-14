const express = require('express');
const answerRouter = express.Router();
const router = express.Router();
const QuestionModel = require('../database/models/question.model');
const AnswerModel = require('../database/models/answer.model');
const AnswerController = require('../controllers/answer.controller');
const FieldsMiddleware = require('../middlewares/fields.middleware');
const existsMiddleware = require('../middlewares/exists.middleware');
/**
 * Answer's endpoint middleware list.
 */
answerRouter.use(
  '/:questionId/answers',
  [
    async (req, res, next) => {
      const { questionId: id } = req.params;
      const questionModel = await QuestionModel.findById(id);

      if (!questionModel) {
        return res.status(404).send();
      }

      AnswerController.Question = questionModel;
      next();
    },
  ],
  router,
);

router.post('/', (...args) => FieldsMiddleware.checkRequired(...args, ['content']));
router
  .route('/:id')
  .all((...args) => existsMiddleware(AnswerController.model, ...args))
  .post((...args) => FieldsMiddleware.checkRequired(...args, ['content']));

/**
 * Answer's endpoint list.
 */
router
  .route('/')
  .get((req, res) => AnswerController.all(req, res))
  .post((req, res) => AnswerController.create(req, res));

router
  .route('/:id')
  .get((req, res) => AnswerController.show(req, res))
  .post((req, res) => AnswerController.update(req, res))
  .delete((req, res) => AnswerController.destroy(req, res));

module.exports = answerRouter;
