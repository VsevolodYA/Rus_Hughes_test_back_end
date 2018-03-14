const Controller = require('./controller');
const AnswerModel = require('../database/models/answer.model');

class AnswerController extends Controller {
  static get model() {
    return {
      async findAll() {
        return await AnswerController.Question.getAnswers();
      },
      async create(body) {
        return await AnswerController.Question.createAnswer(body);
      },
      async findById(id) {
        return (await AnswerController.Question.getAnswers()).find(answer => answer.id === id);
      },
    };
  }
}

module.exports = AnswerController;
