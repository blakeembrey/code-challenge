# Code Challenge

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

Install, run and share command line challenges. Perfect for learning, practicing or teaching others how to code.

## Installation

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

## Inspiration

Code challenge was originally inspired by all the work put into [learnyounode](https://github.com/rvagg/learnyounode) and [stream-adventure](https://github.com/substack/stream-adventure).

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
