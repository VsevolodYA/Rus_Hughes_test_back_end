const Controller = require('./controller');
const QuestionModel = require('../database/models/question.model');
const AnswerModel = require('../database/models/answer.model');

class QuestionController extends Controller {
  static get model() {
    return QuestionModel;
  }

  static async destroy(req, res) {
    const { id } = req.params;
    const questionModel = await this.model.findById(id);

    await AnswerModel.destroy({ where: { questionId: questionModel.id } });
    return res.send(await questionModel.destroy());
  }
}

module.exports = QuestionController;
