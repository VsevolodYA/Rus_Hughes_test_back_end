const { sequelize, Sequelize } = require('../');
const AnswerModel = require('./answer.model');

/**
 * QuestionModel describes 'questions' table
 */
const QuestionModel = sequelize.define(
  'Question',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
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
    tableName: 'questions',
  },
);

/**
 * Describes questions <=> answers relationship
 */
QuestionModel.hasMany(AnswerModel, { foreignKey: 'questionId' });
AnswerModel.belongsTo(QuestionModel, { foreignKey: 'questionId' });

module.exports = QuestionModel;
