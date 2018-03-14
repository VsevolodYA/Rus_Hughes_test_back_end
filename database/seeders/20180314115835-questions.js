const uuidv4 = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questions', null, {});
    return queryInterface.bulkInsert(
      'questions',
      [
        {
          id: uuidv4(),
          content: 'First question',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('questions', null, {});
  },
};
