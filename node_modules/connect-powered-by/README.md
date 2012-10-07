# connect-powered-by

This middleware sets or removes the `X-Powered-By` header on HTTP responses.
`X-Powered-By` is a de facto standard that specifies the technology supporting
a web application.  This header is used by services that gather metrics about
the web, including [Alexa](http://www.alexa.com/) and [Netcraft](http://www.netcraft.com/).

## Installation

    $ npm install connect-powered-by

## Usage

To set the `X-Powered-By` header on responses, simply use `poweredBy` middleware
with a technology string.

    var poweredBy = require('connect-powered-by');

    app.configure(function() {
      app.use(poweredBy('Locomotive'));
    });

To remove the `X-Powered-By` header, use `poweredBy` middleware and specify
`null` as the technology string.  This is useful if you want to remove this
header when it is set unconditionally by your application framework, for example
[Express](http://expressjs.com/).

    var poweredBy = require('connect-powered-by');

    app.configure(function() {
      app.use(poweredBy(null));
    });

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/connect-powered-by.png)](http://travis-ci.org/jaredhanson/connect-powered-by)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

(The MIT License)

Copyright (c) 2011 Jared Hanson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
