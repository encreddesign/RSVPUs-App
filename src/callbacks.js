/**
 * @class Callbacks
 */
class Callbacks {

  constructor() {}

  /**
   * Logs in user and returns session object
   * @param {Request} req
   * @param {Response} res
   */
  loginUser(req, res) {
    const data = {};

    res.json(data);
  }
}

module.exports = Callbacks;