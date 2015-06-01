/*jshint node:true */
/*jshint esnext:true */
'use strict';

module.exports = function () {
  //options = options || {};
  var rebound = ["not allowed"];
  return function* (next) {

    let ctx = this;
    let req = this.req;

    if (ctx.path === '/api/wordCombinations/0') {
      console.log('what the heck');
      return this.body = rebound;
    }

    if (ctx.path === '/api/wordCombinations/1') {
      console.log('what the heck');
      return this.body = rebound;
    }

    yield* next;

  };


};
