const Database = require('./database');

/**
 * @class Callbacks
 */
class Callbacks {

  constructor() {}

  /**
   * Creates new user
   * @param {Request} req 
   * @param {Response} res 
   */
  createUser(req, res) {
    const options = req.query;
    const database = new Database();

    database.createNewUser(options).then((response) => {
      if(response.error) return console.error(response.error);

      let message;

      if(response.data.affectedRows > 0) {
        message = `Thankyou ${options.UserName}, please click the link we have emailed you to verify your account.`;
      }

      console.log(response.data);
      res.send({ status: 200, message: message });

    }).catch((error) => {

      console.error(error);
      res.status(404).send({ status: 404, message: error });
    });
  }

  /**
   * Verify user account
   * @param {Request} req 
   * @param {Response} res 
   */
  verifyUserAccount(req, res) {
    const options = {};
    const database = new Database();

    options.Email = req.query.Email;
    options.Code = req.params.Code;
  }

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