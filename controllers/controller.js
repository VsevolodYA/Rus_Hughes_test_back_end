class Controller {
  static get model() {
    throw new Error('Abstract method!');
  }

  static async all(req, res) {
    return res.send(await this.model.findAll());
  }

  static async show(req, res) {
    const { id } = req.params;
    return res.send(await this.model.findById(id));
  }

  static async create(req, res) {
    return res.send(await this.model.create(req.body));
  }

  static async update(req, res) {
    const { id } = req.params;
    const model = await this.model.findById(id);

    await model.update(req.body);

    return res.send(model);
  }

  static async destroy(req, res) {
    const { id } = req.params;
    const model = await this.model.findById(id);

    return res.send(await model.destroy());
  }
}

module.exports = Controller;
