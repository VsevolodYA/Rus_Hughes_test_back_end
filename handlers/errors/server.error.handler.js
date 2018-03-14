require('dotenv').config();

const { NODE_ENV } = process.env;

const serverErrorHandler = (res, exception) => {
  const e = new Error(exception);
  const error = e.message;
  const stack = e.stack;

  res.status(500).send(NODE_ENV !== 'PROD' ? { error, stack } : null);
};

module.exports = serverErrorHandler;
