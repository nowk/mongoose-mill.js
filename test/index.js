/* jshint node: true */

process.env.NODE_ENV = 'test';

var assert = require('chai').assert;
var Promise = require('bluebird');
var mongoose = require('mongoose');
var factory = require('..')(mongoose);

describe("mongoose-mill", function() {
  before(function(done) {
    mongoose.connect("mongodb://127.0.0.1:27017/mongoose_mill_test");
    mongoose.connection.once('connected', done);
  });

  after(function(done) {
    mongoose.disconnect(done);
  });

  beforeEach(function() {
    mongoose.model('User', mongoose.Schema({
      name: String,
      provider: String,
      oauth_id: String
    }));
  });

  afterEach(function(done) {
    var models = Object.keys(mongoose.models);
    var len = models.length;
    models.forEach(function(m, i){
      var model = mongoose.models[m];
      model.remove({}, function(err) {
        if (i>=len-1) {
          mongoose.models = {};
          done();
        }
      });
    });
  });

  it("creates factory fn with default attributes", function(done) {
    var userf = factory('User', {provider: 'github'});

    Promise.all([
      userf({name: 'Foo', oauth_id: '12345'}),
      userf({name: 'Bar', oauth_id: '67890'}),
    ])
    .spread(function(a, b) {
      assert.equal(a.provider, 'github');
      assert.equal(a.name, 'Foo');
      assert.equal(a.oauth_id, '12345');

      assert.equal(b.provider, 'github');
      assert.equal(b.name, 'Bar');
      assert.equal(b.oauth_id, '67890');
    })
    .catch(function(err) {
      console.log(err);
    })
    .finally(done);
  });
});
