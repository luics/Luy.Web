var vows = require('vows');
var assert = require('assert');
var server = require('../lib/index');


vows.describe('connect-server').addBatch({
  
  'module': {
    'should export middleware': function () {
      assert.isFunction(server);
    },
  },
  
}).export(module);
