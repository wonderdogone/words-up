
/*jshint node:true */
/*jshint esnext:true */
'use strict';
const app = require('../app');
const BPromise = require("bluebird");
const util = require('util');
const path = require('path');
const fs = BPromise.promisifyAll(require("fs"));
const _ = require('highland');

/**
 * Construct -- going to load some bootstrapping here which normally
  * in a large app would be elsehwere
 */
function Mapper() {
  //new-agnostic constructor
  var self = this instanceof Mapper ? this : Object.create(Mapper.prototype);

  let words;
  let dict = [];
  this.dictionary = dict;

  let content;
  fs.readFile('./data/words.txt', 'utf8',function (err,data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    content = util.format(data);
    words = content.split( "\n" );

    for (var i = 0, len = words.length; i < len; i++) {
      dict.push(words[i]);
    }

  });

}

/**
 * Main Interface routine to this service
 */
Mapper.prototype.theHandler = BPromise.coroutine(function* (val) {

  var numbers = val.split("");

  var ng = yield this.pong(val);

  var keyb = ng.keypad;

  var letters = yield BPromise.resolve(this.whoArray(numbers,keyb));

  var combinations = yield BPromise.resolve(this.combos(letters));

  var words = yield BPromise.resolve(this.wordy(combinations));

  return words;
});

/**
 * find mathching numbers to map data
 */
Mapper.prototype.whoArray = function (numbers, keyb) {

  var lm = [];
  _(numbers).map(function (numbers) {

    keyb.forEach(function(entry) {

      if (entry.number == numbers) {
        lm.push(entry.value);
      }

    });

  })
  .toArray(function (xs) {
  });

  return lm;
};

//TODO: make this streams to not buffer up
Mapper.prototype.combos = function (arr) {
  var result = [];
  if (arr.length == 1) {
    return arr[0];
  } else {

    var allCasesOfRest = this.combos(arr.slice(1));
    for (var i = 0; i < allCasesOfRest.length; i++) {
      for (var j = 0; j < arr[0].length; j++) {
        result.push(arr[0][j] + allCasesOfRest[i]);
      }
    }

  }

  return result;
};

/**
 * find combinations
 */
Mapper.prototype.wordy = function (combs) {
  let finalWord =[];
  let dict = this.dictionary;

  _(combs).map(function (c) {
    dict.forEach(function(entry) {

      if (entry == c) {
        finalWord.push(c);
      }
    });

    return c;
  })
  .done(function (xs) {
  });

  console.log(finalWord);

  return finalWord;
};

/**
 * data
 */
Mapper.prototype.pong = BPromise.coroutine(function* (val) {

  let mm = { "keypad": [
    {
      "number": 2,
      "value": ["a","b","c"]
    },
    {
      "number": 3,
      "value": ["d","e","f"]
    },
    {
      "number": 4,
      "value": ["g","h","i"]
    },
    {
      "number": 5,
      "value": ["j","k","l"]
    },
    {
      "number": 6,
      "value": ["m","n","o"]
    },
    {
      "number": 7,
      "value": ["p","q","r","s"]
    },
    {
      "number": 8,
      "value": ["t","u","v"]
    },
    {
      "number": 9,
      "value": ["w","x","y","z"]
    }
  ] };

  return mm;

});


module.exports = new Mapper('mapper');
