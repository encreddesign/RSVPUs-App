const fs = require('fs');

/**
 * @class Router
 */
class Router {

  constructor(config, callbackClass) {
    this._path = config;
    this._routes = {};
    this._callbackClass = callbackClass;

    this._load();
  }

  /**
   * Returns specific route
   * @param {String} key 
   * 
   * @return {Object}
   */
  get(key) {
    if(this._routes[key] === null) return;

    let struct = {};
    const route = this._routes[key];

    if(this._callbackClass[route.handler]) {
      struct = {
        "path": route.route,
        "callback": this._callbackClass[route.handler]
      }
    }

    return struct;
  }

  /**
   * Loads route config
   * @private
   */
  _load() {
    try {
      this._routes = fs.readFileSync(this._path, 'utf-8');

      if(this._routes) {
        this._routes = JSON.parse(this._routes);
      }
    } catch(ex) {
      console.error(ex);
    }
  }
}

module.exports = Router;