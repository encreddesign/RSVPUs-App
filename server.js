const dotenv = require('dotenv').config();

const Express = require('express');
const App = Express();

const Router = require('./src/router');
const Callbacks = require('./src/callbacks');

const port = 3000;
const router = new Router('config/routes.json', new Callbacks());

// register routes
App.post(router.get('Login').path, router.get('Login').callback);

App.listen(port, () => console.log(`RSVPUs server listening on port ${port}...`));
