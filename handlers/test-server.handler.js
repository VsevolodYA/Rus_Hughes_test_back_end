const http = require('http');
const Server = require('../server');
const server = new Server();

class TestServerHandler {
  constructor() {
    this.init();
  }

  init() {
    server.useRoutes();
    this.express = server.express;
    this.server = http.createServer(this.express);

    this.server.listen(4555, () => console.log(`Test server listening on port 4555!`));
  }

  close(cb) {
    this.server.close(() => cb());
  }
}

module.exports = new TestServerHandler();
