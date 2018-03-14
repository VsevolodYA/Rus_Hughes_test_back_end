const serverErrorHandler = require('../handlers/errors/server.error.handler');

const existsMiddleware = async (model, req, res, next, ID) => {
  const { id = ID } = req.params;

  try {
    if (!await model.findById(id)) {
      return res.status(404).send();
    }

    next();
  } catch (e) {
    serverErrorHandler(res, e);
  }
};

module.exports = existsMiddleware;
