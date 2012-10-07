var vows = require('vows');
var assert = require('assert');
var util = require('util');
var serverHeader = require('../lib/server');


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


vows.describe('serverHeader').addBatch({

  'middleware with a string': {
    topic: function() {
      return serverHeader('Foo/1.2');
    },
    
    'when handling a request': {
      topic: function(serverHeader) {
        var self = this;
        var req = new MockRequest();
        var res = new MockResponse();
        
        function next(err) {
          self.callback(err, req, res);
        }
        process.nextTick(function () {
          serverHeader(req, res, next)
        });
      },
      
      'should not error' : function(err, req, res) {
        assert.isNull(err);
      },
      'should set header' : function(err, req, res) {
        assert.equal(res.headers['Server'], 'Foo/1.2');
      },
    },
  },
  
  'middleware with an object containing name': {
    topic: function() {
      return serverHeader({ name: 'Foo' });
    },
    
    'when handling a request': {
      topic: function(serverHeader) {
        var self = this;
        var req = new MockRequest();
        var res = new MockResponse();
        
        function next(err) {
          self.callback(err, req, res);
        }
        process.nextTick(function () {
          serverHeader(req, res, next)
        });
      },
      
      'should not error' : function(err, req, res) {
        assert.isNull(err);
      },
      'should set header' : function(err, req, res) {
        assert.equal(res.headers['Server'], 'Foo');
      },
    },
  },
  
  'middleware with an object containing name and version': {
    topic: function() {
      return serverHeader({ name: 'Foo', version: '2.4' });
    },
    
    'when handling a request': {
      topic: function(serverHeader) {
        var self = this;
        var req = new MockRequest();
        var res = new MockResponse();
        
        function next(err) {
          self.callback(err, req, res);
        }
        process.nextTick(function () {
          serverHeader(req, res, next)
        });
      },
      
      'should not error' : function(err, req, res) {
        assert.isNull(err);
      },
      'should set header' : function(err, req, res) {
        assert.equal(res.headers['Server'], 'Foo/2.4');
      },
    },
  },
  
  'middleware with an object containing name, version, and comment': {
    topic: function() {
      return serverHeader({ name: 'Foo', version: '2.4', comment: 'UNIX' });
    },
    
    'when handling a request': {
      topic: function(serverHeader) {
        var self = this;
        var req = new MockRequest();
        var res = new MockResponse();
        
        function next(err) {
          self.callback(err, req, res);
        }
        process.nextTick(function () {
          serverHeader(req, res, next)
        });
      },
      
      'should not error' : function(err, req, res) {
        assert.isNull(err);
      },
      'should set header' : function(err, req, res) {
        assert.equal(res.headers['Server'], 'Foo/2.4 (UNIX)');
      },
    },
  },
  
  'middleware with an object containing only comment': {
    topic: function() {
      return serverHeader({ comment: 'UNIX' });
    },
    
    'when handling a request': {
      topic: function(serverHeader) {
        var self = this;
        var req = new MockRequest();
        var res = new MockResponse();
        
        function next(err) {
          self.callback(err, req, res);
        }
        process.nextTick(function () {
          serverHeader(req, res, next)
        });
      },
      
      'should not error' : function(err, req, res) {
        assert.isNull(err);
      },
      'should set header' : function(err, req, res) {
        assert.equal(res.headers['Server'], '(UNIX)');
      },
    },
  },
  
  'middleware with an array of strings': {
    topic: function() {
      return serverHeader(['Foo/1.2', 'Bar/2.4']);
    },
    
    'when handling a request': {
      topic: function(serverHeader) {
        var self = this;
        var req = new MockRequest();
        var res = new MockResponse();
        
        function next(err) {
          self.callback(err, req, res);
        }
        process.nextTick(function () {
          serverHeader(req, res, next)
        });
      },
      
      'should not error' : function(err, req, res) {
        assert.isNull(err);
      },
      'should set header' : function(err, req, res) {
        assert.equal(res.headers['Server'], 'Foo/1.2 Bar/2.4');
      },
    },
  },
  
  'middleware with an array of objects': {
    topic: function() {
      return serverHeader([{ name: 'Foo', version: '1.2' }, { comment: 'UNIX' }, { name: 'Bar', version: '2.4', comment: 'Java' }]);
    },
    
    'when handling a request': {
      topic: function(serverHeader) {
        var self = this;
        var req = new MockRequest();
        var res = new MockResponse();
        
        function next(err) {
          self.callback(err, req, res);
        }
        process.nextTick(function () {
          serverHeader(req, res, next)
        });
      },
      
      'should not error' : function(err, req, res) {
        assert.isNull(err);
      },
      'should set header' : function(err, req, res) {
        assert.equal(res.headers['Server'], 'Foo/1.2 (UNIX) Bar/2.4 (Java)');
      },
    },
  },
  
  'middleware with an array of mixed objects and strings': {
    topic: function() {
      return serverHeader([{ name: 'Node.js', version: '0.6.12' }, 'Connect', { name: 'Express' }]);
    },
    
    'when handling a request': {
      topic: function(serverHeader) {
        var self = this;
        var req = new MockRequest();
        var res = new MockResponse();
        
        function next(err) {
          self.callback(err, req, res);
        }
        process.nextTick(function () {
          serverHeader(req, res, next)
        });
      },
      
      'should not error' : function(err, req, res) {
        assert.isNull(err);
      },
      'should set header' : function(err, req, res) {
        assert.equal(res.headers['Server'], 'Node.js/0.6.12 Connect Express');
      },
    },
  },
  
  'middleware with null': {
    topic: function() {
      return serverHeader(null);
    },
    
    'when handling a request': {
      topic: function(serverHeader) {
        var self = this;
        var req = new MockRequest();
        var res = new MockResponse();
        res.headers['Server'] = 'Foo';
        
        function next(err) {
          self.callback(err, req, res);
        }
        process.nextTick(function () {
          serverHeader(req, res, next)
        });
      },
      
      'should not error' : function(err, req, res) {
        assert.isNull(err);
      },
      'should remove header' : function(err, req, res) {
        assert.isUndefined(res.headers['Server']);
      },
    },
  },

}).export(module);
