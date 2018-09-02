const mysql = require('mysql');

/**
 * @class Mysqler
 */
class Mysqler {

  constructor() {
    this._TAG = 'Mysqler';
  }

  /**
   * Creates simple connection to database
   */
  createConnection() {
    this._connection = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    });
  }

  /**
   * Creates a pool connection
   */
  createPoolConnection() {
    this._connection = mysql.createPool({
      connectionLimit: process.env.CONNECTION_LIMIT,
      host: process.env.HOST,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    }) 
  }

  /**
   * Runs a query within a pool connection
   * @param {String} query
   * @param {Function} callback 
   */
  runPoolQuery(query, callback) {
    if(this._connection === null) throw `${this._TAG}: Connection not open`;

    this._connection.getConnection((err, connection) => {
      if(err) throw `${this._TAG}: ${err}`;

      callback(query, connection);
    });
  }

  /**
   * Runs single query and calls callback
   * @param {String} query 
   * @param {Connection} connection
   * @return {Promise}
   */
  runQuery(query, connection = null) {
    const conn = connection ? connection : this._connection;

    return new Promise((resolve, reject) => {
      conn.query(query, (error, results, fields) => {
        if(connection) connection.release();

        if(error) return reject(error);
  
        resolve(results);
      });
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