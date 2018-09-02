class Query {

  constructor() {
    this._table = {};
  }

  /**
   * Adds query to array
   * @param {String} key 
   * @param {String} queryString 
   */
  addQuery(key, queryString) {
    this._table[key] = queryString;
  }

  /**
   * Returns specific query
   * @param {String} key 
   */
  getQuery(key) {
    return this._table[key] ? this._table[key] : null;
  }

  /**
   * Remove query
   * @param {String} key 
   */
  removeQuery(key) {
    if(this._table[key]) {
      delete this._table[key];
    }
  }

  /**
   * Resets queries
   */
  resetQueries() {
    this._table = {};
  }
}

module.exports = Query;