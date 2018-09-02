const crypto = require('crypto');
/**
 * @class Hash
 */
class Hash {

  constructor() {
    this._saltLength = 32;
  }

  /**
   * Generates random salt key
   */
  _generateSalt() {
    return crypto.randomBytes(Math.ceil(this._saltLength / 2))
              .toString('hex')
              .slice(0, this._saltLength);
  }

  /**
   * Generates sha512 encryption hash
   * @param {String} password 
   */
  _generateSha512(password) {
    const salt = this._generateSalt();
    const hash = crypto.createHmac('sha512', salt);

    hash.update(password);

    const hashed = hash.digest('hex');

    return {
      salt: salt,
      passwordHash: hashed
    };
  }

  /**
   * Generates encryption hash on password
   * @param {String} password 
   */
  generatePasswordHash(password) {
    return this._generateSha512(password);
  }

  /**
   * Generates md5 hash
   * @param {String} string 
   */
  generateHash(string) {
    return crypto.createHash('md5').update(string).digest('hex');
  }

  /**
   * Glues together class
   */
  static glue() {
    return new Hash();
  }
}

module.exports = Hash;