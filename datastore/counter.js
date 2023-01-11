
const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0); //if no number, second parameter is 0
    } else {
      callback(null, Number(fileData)); //if number exists, second parameter is the number
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString); //only runs CB on success, second param is the number as a string
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  //we need to call the callback at some point with the newest counter
  //counter = counter + 1;

  readCounter((err, counter) => {
    if (err) {
      console.log('error in read counter', err);
    } else { //if we do get a number
      console.log(counter);
      writeCounter(counter = counter + 1, (err, counter) => {
        if (err) {
          console.log('error in write counter', err);
        } else {
          callback(null, counter);
          return counter; //this needs to end up in callback(null, counter)
        }
      });
    }
  });
  //return zeroPaddedNumber(counter);
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
