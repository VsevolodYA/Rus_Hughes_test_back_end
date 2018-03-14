const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const should = chai.should();
const { assert, expect } = chai;
const QuestionModel = require('../../database/models/question.model');
const AnswerModel = require('../../database/models/answer.model');
const TestServerHandler = require('../../handlers/test-server.handler');

chai.use(chaiHttp);

describe('Answer endpoints', () => {
  const req = chai.request(TestServerHandler.express);
  let questionModel;
  const keys = ['id', 'questionId', 'content', 'createdAt', 'updatedAt'];

  before(done => {
    QuestionModel.destroy({ where: {}, truncate: true })
      .then(() => AnswerModel.destroy({ where: {}, truncate: true }))
      .then(() => QuestionModel.create({ content: 'Test question' }))
      .then(model => (questionModel = model))
      .then(() => done());
  });

  after(done => {
    QuestionModel.destroy({ where: {}, truncate: true })
      .then(() => AnswerModel.destroy({ where: {}, truncate: true }))
      .then(() => done());
  });

  describe('api/questions/:questionId/answers', () => {
    describe('#success', () => {
      it('should creates answer model by questionId', done => {
        const data = {
          content: 'New answer',
        };

        const path = `/api/questions/${questionModel.id}/answers`;
        req
          .post(path)
          .set('Accept', 'application/json')
          .send(data)
          .end((err, res) => {
            const { body, status } = res;

            expect(status).to.be.equal(200);
            expect(body)
              .be.a('object')
              .to.have.all.keys(...keys)
              .to.have.property('content', data.content);
            done();
          });
      });

      it('should gets a answer collection by questionId', done => {
        const path = `/api/questions/${questionModel.id}/answers`;
        req
          .get(path)
          .set('Accept', 'application/json')
          .send()
          .end((err, res) => {
            const { body, status } = res;

            expect(status).to.be.equal(200);
            expect(body)
              .be.an('array')
              .to.have.lengthOf(1);
            expect(body[0]).to.have.all.keys(...keys);
            done();
          });
      });

      it('should gets empty answer collection by questionId', done => {
        questionModel.setAnswers([]).then(questionModel => {
          const path = `/api/questions/${questionModel.id}/answers`;
          req
            .get(path)
            .set('Accept', 'application/json')
            .send()
            .end((err, res) => {
              const { body, status } = res;

              expect(status).to.be.equal(200);
              expect(body)
                .be.an('array')
                .to.have.lengthOf(0);
              done();
            });
        });
      });
    });
  });

  describe('api/questions/:questionId/answers/:id', () => {
    before(done => {
      questionModel.createAnswer({ content: 'Test question' }).then(() => done());
    });

    describe('#success', () => {
      it('should updates answer model by questionId and answer id', done => {
        const data = {
          content: 'Updated answer',
        };

        questionModel.getAnswers().then(answerCollection => {
          const answerModel = answerCollection[0];
          const path = `/api/questions/${questionModel.id}/answers/${answerModel.id}`;
          req
            .post(path)
            .set('Accept', 'application/json')
            .send(data)
            .end((err, res) => {
              const { body, status } = res;
              expect(status).to.be.equal(200);
              expect(body)
                .be.a('object')
                .to.have.all.keys(...keys)
                .to.have.property('content', data.content);
              done();
            });
        });
      });

      it('should destroy answer model by questionId and answer id', done => {
        questionModel
          .getAnswers()
          .then(answerCollection => {
            const answerModel = answerCollection[0];
            const path = `/api/questions/${questionModel.id}/answers/${answerModel.id}`;

            return new Promise((resolve, reject) => {
              req
                .delete(path)
                .set('Accept', 'application/json')
                .send()
                .end((err, res) => {
                  const { body, status } = res;
                  expect(status).to.be.equal(200);
                  expect(body)
                    .be.a('object')
                    .to.have.all.keys(...keys);

                  resolve();
                });
            });
          })
          .then(() => questionModel.getAnswers())
          .then(answerCollection => {
            expect(answerCollection)
              .be.an('array')
              .to.have.lengthOf(0);
            done();
          });
      });
    });
  });
});
