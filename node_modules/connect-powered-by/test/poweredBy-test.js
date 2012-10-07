var vows = require('vows');
var assert = require('assert');
var util = require('util');
var poweredBy = require('poweredBy');


function MockRequest() {
}

function MockResponse() {
  this.headers = {};
}

MockResponse.prototype.setHeader = function(name, value) {
  this.headers[name] = value;
}

MockResponse.prototype.removeHeader = function(name, value) {
  delete this.headers[name];
}


vows.describe('poweredBy').addBatch({

  'middleware with a technology string': {
    topic: function() {
      return poweredBy('Foo');
    },
    
    'when handling a request': {
      topic: function(poweredBy) {
        var self = this;
        var req = new MockRequest();
        var res = new MockResponse();
        
        function next(err) {
          self.callback(err, req, res);
        }
        process.nextTick(function () {
          poweredBy(req, res, next)
        });
      },
      
      'should not error' : function(err, req, res) {
        assert.isNull(err);
      },
      'should set header' : function(err, req, res) {
        assert.equal(res.headers['X-Powered-By'], 'Foo');
      },
    },
  },
  
  'middleware without a technology string': {
    topic: function() {
      return poweredBy(null);
    },
    
    'when handling a request': {
      topic: function(poweredBy) {
        var self = this;
        var req = new MockRequest();
        var res = new MockResponse();
        res.headers['X-Powered-By'] = 'Foo';
        
        function next(err) {
          self.callback(err, req, res);
        }
        process.nextTick(function () {
          poweredBy(req, res, next)
        });
      },
      
      'should not error' : function(err, req, res) {
        assert.isNull(err);
      },
      'should remove header' : function(err, req, res) {
        assert.isUndefined(res.headers['X-Powered-By']);
      },
    },
  },

}).export(module);
