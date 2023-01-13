const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

/* todos.create('todo1', (err, data) => {
  const todoCount = fs.readdirSync(todos.dataDir).length;
  expect(todoCount).to.equal(1);
  todos.create('todo2', (err, data) => {
    expect(fs.readdirSync(todos.dataDir)).to.have.lengthOf(2);
    done();
  });
});
 */

exports.create = (text, callback) => {
  //use id to create file path inside dataDir
  //Each time a POST request is made to the collection route, save a file with the todo item in this folder.

  //https://nodejs.org/api/fs.html
  //https://www.geeksforgeeks.org/node-js-fs-writefile-method/
  counter.getNextUniqueId((err, counter) => {
    if (err) {
    } else { //if we do get a number
      //console.log('here is the ID: ', id);
      var filePath = path.join(this.dataDir, counter + '.txt');
      fs.writeFile(filePath, text, (err) => {
        if (err) {
          return err;
        } else {
          items[counter] = text;
          callback(null, { id: counter, text: text });
        }
      });
      //return counter;
    }
    // done();
  });
};

exports.readAll = (callback) => {
  /*  Next, refactor the readAll function by returning an array of todos to client app whenever a GET request to the collection route occurs. To do this, you will need to read the dataDir directory and build a list of files. Remember, the id of each todo item is encoded in its filename. */
  var items = fs.readdirSync(this.dataDir);
  console.log('These are items: ', items);
  var data = _.map(items, (id) => {
    return { id: id.slice(0, -4), text: id.slice(0, -4) };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
