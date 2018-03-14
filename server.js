const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

require('dotenv').config();

/**
 * This class describes server with express framework.
 */
class Server {
  constructor() {
    this.express = express();
  }

  /**
   *  This method uses for registering routes in the express application.
   */
  useRoutes() {
    this.express.use(bodyParser.json());
    this.express.use('/api', routes);
  }

  /**
   * This method runs server.
   */
  run() {
    const { PORT } = process.env;

    this.useRoutes();
    this.expressServer = this.express.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
  }
}

/**
 * If this module is not main runs the server.
 */
if (!module.parent) {
  return new Server().run();
}

module.exports = Server;
