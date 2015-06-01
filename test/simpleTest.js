/*global describe, it*/
/*jshint node:true */
/*jshint esnext:true */
'use strict';
var superagent = require('supertest');
var should = require('should');
var chai = require("chai");
var expect = chai.expect;
var app = require('../app');

function request() {
  return superagent(app.listen());
}


/**
 * Simple test to get a correct response and type
 */

describe('Combinations Endpoint', function() {

  it('should RETURN only "hi" as a match', function(done) {
    var url = 'http://localhost:3000';
    request(url)
      .get('/api/wordCombinations/44')
      .expect('Content-Type', /json/)
      .end(function(err, res) {

        if (err) {
          throw err;
        }
        console.log(res.body[0]);
        res.body[0].should.equal('hi');
        expect(res.body).to.be.an('array');
        done();

      });
  });

});
