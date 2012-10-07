# connect-server

This middleware sets or removes the `Server` header on HTTP responses. The
`Server` header contains information about the software used to handle a
request.  This header is used by services that gather metrics about the web,
including [Alexa](http://www.alexa.com/) and [Netcraft](http://www.netcraft.com/).

## Installation

    $ npm install connect-server

## Usage

To set the `Server` header on responses, simply use `server` middleware and
specify server details.

    var serverHeader = require('connect-server');

    app.configure(function() {
      app.use(serverHeader({ name: 'Node.js', version: '0.6.14' }));
    });
    
An array can also be used, to specify an significant subcomponents of a server.

    app.configure(function() {
      app.use(serverHeader([{ name: 'Node.js', version: '0.6.14' },
                            { name: 'Express', version: '2.5.9' }]));
    });

To remove any `Server` header from the response, use `serverHeader` middleware
and specify `null`.

    var poweredBy = require('connect-powered-by');

    app.configure(function() {
      app.use(serverHeader(null));
    });
    
## Security

Revealing the software version of the server may make the system more vulnerable
to attacks, by disclosing details that confirm known security holes, if any.
This risk should be assessed before enabling this functionality on an untrusted
network.

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/connect-server.png)](http://travis-ci.org/jaredhanson/connect-server)


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
