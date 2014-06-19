# mongoose-mill

[![Build Status](https://travis-ci.org/nowk/mongoose-mill.js.svg?branch=master)](https://travis-ci.org/nowk/mongoose-mill.js)
[![Code Climate](https://codeclimate.com/github/nowk/mongoose-mill.js.png)](https://codeclimate.com/github/nowk/mongoose-mill.js)
[![David DM](https://david-dm.org/nowk/mongoose-mill.js.png)](https://david-dm.org/nowk/mongoose-mill.js)

Mongoose factories for tests

## Install

    npm install mongoose-mill

## Usage

    var userf = factory('User', {provider: 'github'});
    var user = userf({name: 'Foo', oauth_id: '12345'}),

    user
      .then(function(resource) {
        // resource => {
        //   provider: 'github',
        //   name: 'Foo',
        //   oauth_id: '12345'
        // }
      });

Factory functions (eg. `userf`) when invoked will return a `Promise`.

## License

MIT
