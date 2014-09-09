# Code Challenge

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

Install, run and share command line challenges. Perfect for learning, practicing or teaching others how to code.

## Installation

You will need to install [node.js](http://nodejs.org/). Once done, you can use `npm` to install the module globally and use the command line interface.

```sh
npm install -g code-challenge
```

## Usage

```bash
challenge select   # Select a challange to use
challenge exercise # Select an exercise to run

challenge print         # Print the currently selected exercise
challenge run [args]    # Run your solution in a test environment
challenge verify [args] # Check your solution is correct

challenge help  # Help menu
challenge reset # Reset everything

challenge next # Move to the next exercise
challenge prev # Move to the previous exercise
```

To get started, try installing your first challenge. I'd recommend [Project Euler](https://projecteuler.net/) using `npm install -g code-challenge-euler`.

## Create Your Own Challenge

To create a custom challenge pack to share, you'll need to create a new npm module and add `code-challenge` as a dependency. The module name must be prefixed with `code-challenge-` to automatically be loaded. The modules main file should require `code-challenge`, set the challenge title and add exercises.

```javascript
var assert    = require('assert');
var challenge = require('code-challenge');

challenge.title = 'Example Challenge';

challenge.exercise('First Exercise')
  .add('print', function () {
    return challenge.renderFile(__dirname + '/exercises/01.md');
  })
  .add('verify', function () {
    return challenge.execFile(this._[0])
      .spread(function (stdout) {
        assert.equal(stdout, 'Example output\n');
      });
  });

...

challenge.exercise('Tenth Exercise')
  .add('print', ...)
  .add('verify', ...);
```

### Rendering Any File

Challenge comes with a `renderFile` method that supports rending content from a file with standard syntax highlighting and colours.

### Executing Any File

Challenge support executing most programming languages based on the file name automatically. By using the `execFile` or `spawnFile` methods, your challenge will be future proof and support all possible languages.

### Failing an Exercise

When running the verification task, you can throw an error, reject a promise, error in a stream or pass an error as the first parameter of the callback to provide feedback.

## Inspiration

Code challenge was originally inspired by all the work put into [learnyounode](https://github.com/rvagg/learnyounode), [stream-adventure](https://github.com/substack/stream-adventure) and [gulp](https://github.com/gulpjs/gulp).

## License

MIT

[npm-image]: https://img.shields.io/npm/v/code-challenge.svg?style=flat
[npm-url]: https://npmjs.org/package/code-challenge
[travis-image]: https://img.shields.io/travis/blakeembrey/code-challenge.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/code-challenge
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/code-challenge.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/code-challenge?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
