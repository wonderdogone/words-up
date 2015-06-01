/*jshint node:true */
/*jshint esnext:true */
'use strict';

/**
 * dependent  on modules
 */

const logger = require('koa-logger');
const json = require('koa-json');
const serve = require('koa-static');
const route = require('koa-route');
const koa = require('koa');
const path = require('path');
const app = module.exports = koa();

// my quick middleware module
const stopper = require('./utils/stop-zeros');

/**
 * my services/modules
 */
 const letters = require('./controllers/letters');

/**
 * check on ccascade up to not accept 0 or 1
 */
app.use(stopper());

// Logger
app.use(logger());


//define some routes
app.use(route.get('/api/wordCombinations/:number', letters.getLetters));

// Serve static files
app.use(serve(path.join(__dirname, 'www')));
