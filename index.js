/* jshint node: true */

var extend = require('node.extend');
var Promise = require('bluebird');

/*
 * expose
 *
 * @param {Mongoose} mongoose
 * @return {Function}
 * @api public
 */

module.exports = function(mongoose) {
  return factory.bind(mongoose);
};


/*
 * factory
 *
 * @param {String} modelName
 * @param {Object} defaults
 * @return {Function}
 * @api private
 */

function factory(modelName, defaults) {
  var self = this;
  defaults = defaults || {};

  return function(attrs) {
    return new Promise(function(resolve, reject) {
      new self.models[modelName](extend(true, {}, defaults, attrs))
        .save(function(err, resource) {
          if (err) {
            return reject(err);
          }
          resolve(resource);
        });
    });
  };
}

