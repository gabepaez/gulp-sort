var through = require('through2'),
    _ = require('lodash');

function gulpSort(fn, options) {
  options = options || {};

  var files = [];

  function push(file, enc, done) {
    files.push(file);
    done();
  }

  function end(done) {
    var self = this;

    if(fn) {
      files = _.sortBy(files, fn, options.thisArg);
    }

    if(options.reverse === true) {
      files.reverse();
    }

    files.forEach(function(file) {
      self.push(file);
    });

    done();
  }

  return through.obj(push, end);
}

module.exports = gulpSort;
