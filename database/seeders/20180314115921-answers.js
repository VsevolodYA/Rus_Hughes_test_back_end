const uuidv4 = require('uuid/v4');
const QuestionModel = require('../models/question.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('answers', null, {});
    return queryInterface.bulkInsert(
      'answers',
      [
        {
          id: uuidv4(),
          content: 'First answer',
          questionId: (await QuestionModel.findAll())[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('answers', null, {});
  },
};
