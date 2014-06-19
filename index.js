/* jshint node: true */

var mongoose = require('mongoose');
var extend = require('node.extend');
var Promise = require('bluebird');

/*
 * expose
 */

module.exports = factory;

/*
 * factory
 *
 * @param {String} modelName
 * @param {Object} defaults
 * @return {Function}
 * @api public
 */

function factory(modelName, defaults) {
  defaults = defaults || {};
  return function(attrs) {
    return new Promise(function(resolve, reject) {
      new mongoose.models[modelName](extend(true, defaults, attrs))
        .save(function(err, resource) {
          if (err) {
            return reject(err);
          }
          resolve(resource);
        });
    });
  };
}

