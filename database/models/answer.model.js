const { sequelize, Sequelize } = require('../');

/**
 * AnswerModel describes 'answers' table
 */
const AnswerModel = sequelize.define(
  'Answer',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    questionId: Sequelize.UUID,
    content: Sequelize.STRING,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: true,
    tableName: 'answers',
  },
);

module.exports = AnswerModel;
