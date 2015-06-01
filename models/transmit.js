
/*jshint node:true */
/*jshint esnext:true */
'use strict';
const app = require('../app');
var util = require('util');
var path = require('path');
var fs = require('fs');
var _ = require('highland');
const stream = require('stream');
//var errors = require('../lib/errors/errors');

var SStream = stream.Transform;

function Transmiter(values, options) {

  if (!(this instanceof Transmiter)) {
    return new Transmiter(values, options);
  }
  // init
  if (!options) options = {};
  options.objectMode = true; //object mode
	SStream.call(this, options);
}
util.inherits(Transmiter, SStream);


Transmiter.prototype._transform = function (chunk, enc, done) {
	//var l = JSON.parse(chunk);

	this.push();

	done();

};

// Transmiter.prototype._flush = function (cb) {

//   cb();
// };

module.exports = new Transmiter('transmiter');
