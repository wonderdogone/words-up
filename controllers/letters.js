
/*jshint node:true */
/*jshint esnext:true */
'use strict';

const mapper = require('../models/mapper');

/**
 * GET word combinations handler
 */
module.exports.getLetters = function *getLetters(number, next) {
  if ('GET' !== this.method) return yield next;

  try {
    try {
      let res = yield mapper.theHandler(number);
      let much = res;
      console.log(much);

      much.length === 0 ? this.body = 'None For This Combination' : this.body = much;

    }
    catch (err) {
      this.throw(405, err);
    }

  }
  catch (er) {
    this.body = { error: 500, reason: er.stack };
  }

};
