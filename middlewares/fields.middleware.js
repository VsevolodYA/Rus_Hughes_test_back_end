const Middleware = require('./middleware');
const QuestionModel = require('../database/models/question.model');

class FieldsMiddleware extends Middleware {
  static checkRequired(req, res, next, fields = []) {
    const errors = {};

    fields.forEach(field => {
      const { [field]: item } = req.body;
      if (!item) {
        errors[field] = this.buildError(errors, field, `${field} field is required!`);
      }
    });

    if (this.isErrors(errors)) {
      return this.sendErrors(errors, res);
    }

    next();
  }
}

module.exports = FieldsMiddleware;
