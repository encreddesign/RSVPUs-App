const mysql = require('mysql');

/**
 * @class Mysqler
 */
class Mysqler {

  constructor() {
    this._connection = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD
    });
  }

  /**
   * Runs query and calls callback
   * @param {String} query 
   * @param {Function} callback 
   */
  runQuery(query, callback) {
    this._connection.query(query, (error, results, fields) => {
      if(error) return callback(error);

      callback(results);
    });
  }

  /**
   * Glues together class for quick use
   */
  static glue() {
    return new Mysqler();
  }
}

module.exports = Mysqler;