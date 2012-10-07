var vows = require('vows');
var assert = require('assert');
var poweredBy = require('index');


vows.describe('connect-powered-by').addBatch({
  
  'module': {
    'should export middleware': function () {
      assert.isFunction(poweredBy);
    },
  },
  
}).export(module);
