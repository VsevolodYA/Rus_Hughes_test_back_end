const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const should = chai.should();
const { assert, expect } = chai;
const QuestionModel = require('../../database/models/question.model');
const TestServerHandler = require('../../handlers/test-server.handler');

chai.use(chaiHttp);
describe('Question endpoints', () => {
  const req = chai.request(TestServerHandler.express);
  let path = '/api/questions';
  const keys = ['id', 'content', 'createdAt', 'updatedAt'];

  before(done => {
    QuestionModel.destroy({ where: {}, truncate: true }).then(() => done());
  });

  after(done => {
    QuestionModel.destroy({ where: {}, truncate: true }).then(() => done());
  });

  describe('api/questions', () => {
    describe('#success', () => {
      it('should creates question model', done => {
        const data = {
          content: 'New question',
        };

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

      it('should gets a question collection', done => {
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

      it('should gets empty question collection', done => {
        QuestionModel.destroy({ where: {}, truncate: true }).then(() => {
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

  describe('api/questions/:id', () => {
    let questionModel;

    before(done => {
      QuestionModel.create({ content: 'Test question' })
        .then(model => (questionModel = model))
        .then(() => done());
    });

    describe('#success', () => {
      it('should updates question model by id', done => {
        const data = {
          content: 'Updated test question',
        };

        req
          .post(`${path}/${questionModel.id}`)
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

      it('should destroy question model by id', done => {
        new Promise((resolve, reject) => {
          req
            .delete(`${path}/${questionModel.id}`)
            .set('Accept', 'application/json')
            .send()
            .end((err, res) => {
              const { body, status } = res;
              expect(status).to.be.equal(200);
              expect(body)
                .be.a('object')
                .to.have.all.keys(...keys);
              expect(body.id).to.be.equal(questionModel.id);

              resolve();
            });
        }).then(() => done());
      });
    });
  });
});
