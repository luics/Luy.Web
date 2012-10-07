var vows = require('vows');
var assert = require('assert');
var header = require('index');


vows.describe('connect-header').addBatch({
  
  'module': {
    'should export middleware': function () {
      assert.isFunction(header);
    },
  },
  
}).export(module);
