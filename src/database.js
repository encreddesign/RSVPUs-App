const Mysqler = require('./mysqler');
const Hash = require('./hash');
const Query = require('./query');

/**
 * @class Database
 */
class Database {

  constructor() {
    this._TAG = 'Database';
    
    this._mysqler = Mysqler.glue();
    this._query = new Query();
  }

  /**
   * Creates new user in database if user don't already exists
   * @param {Object} options
   * @return {Promise}
   */
  createNewUser(options) {
    this._mysqler.createPoolConnection();

    return new Promise((resolve, reject) => {
      if(options.UserName === undefined || options.UserName === null) reject({ error: 'User name is required' });
      if(options.UserEmail === undefined || options.UserEmail === null) reject({ error: 'User email is required' });
      if(options.UserPassword === undefined || options.UserPassword === null) reject({ error: 'User password is required' });
      
      this._checkUserExists(options.UserEmail).then((args) => {

        if(args.error) reject({ error: args.error });
        if(args.exists) reject({ error: `A user with the email ${options.UserEmail} already exists` });

        const passHash = Hash.glue().generatePasswordHash(options.UserPassword);
        const emailHash = Hash.glue().generateHash(options.UserEmail);

        this._query.addQuery(
          'UserNew', 
          `INSERT INTO Users (UserName, UserEmail, UserPasswordHash, UserSalt, UserHash) 
          VALUES ('${options.UserName}', '${options.UserEmail}', '${passHash.passwordHash}', '${passHash.salt}', '${emailHash}')`
        );

        this._mysqler.runPoolQuery(this._query.getQuery('UserNew'), (query, connection) => {

          this._mysqler.runQuery(query, connection)
              .then((results) => resolve({ data: results }))
              .catch((error) => resolve({ error: error }));
        });

      }).catch((error) => reject({ error: error }));
    });
  }

  /**
   * Checks if user already exists
   * @param {String} userEmail
   * @return {Promise}
   */
  _checkUserExists(userEmail) {
    this._query.addQuery('UserExists', `SELECT UserId FROM Users WHERE UserEmail='${userEmail}'`);

    return new Promise((resolve, reject) => {

      this._mysqler.runPoolQuery(this._query.getQuery('UserExists'), (query, connection) => {

        this._mysqler.runQuery(query, connection)
            .then((results) => results.length === 0 ? resolve({ exists: false }) : resolve({ exists: true }))
            .catch((error) => reject({ exists: false, error: error }));
      });
    });
  }

  /**
   * Verifies user by email and hash
   * @param {Object} options 
   */
  verifyUser(options) {
    this._mysqler.createPoolConnection();

    return new Promise((resolve, reject) => {
      if(options.Email === undefined || options.Email === null) reject({ error: 'Verification not valid' });
      if(options.Code === undefined || options.Code === null) reject({ error: 'Verification not valid' });
    });
  }
}

module.exports = Database;