var chalk       = require('chalk');
var stringify   = require('javascript-stringify');
var createPatch = require('diff').createPatch;
var log         = require('../log');
var cross       = require('../format/cross');
var _toString   = Object.prototype.toString;

/**
 * Create a diffable string of the value.
 *
 * @param  {*}      value
 * @return {String}
 */
var diffStringify = function (value) {
  return stringify(value, function (value, indent, stringify) {
    // Sort object properties consistently by name.
    if (typeof value === 'object' && value !== null) {
      var canonicalObj = {};

      Object.keys(value).sort().forEach(function (key) {
        canonicalObj[key] = value[key];
      });

      return stringify(canonicalObj);
    }

    return stringify(value);
  }, 2);
};

/**
 * Print the diff between two strings.
 *
 * @param {String} actual
 * @param {String} expected
 */
var printDiff = function (actual, expected) {
  var indent = '      ';
  var length = Math.max(actual.length, expected.length);
  var diff   = [];

  // Print basic instructions on reading the diff.
  log('      ' + chalk.bgGreen('+ expected') + ' ' + chalk.bgRed('- actual'));
  log();

  // Create the diff patch to render.
  var diff = createPatch('string', actual, expected)
    .split('\n')
    .splice(4)
    .map(function (line) {
      if (line[0] === '+') {
        return indent + chalk.bgGreen(line);
      }

      if (line[0] === '-') {
        return indent + chalk.bgRed(line);

      }

      if (/\@\@/.test(line) || /\\ No newline/.test(line)) {
        return null;
      }

      return indent + line;
    })
    .filter(function (line) {
      return line != null;
    })
    .join('\n');

  log(diff);
};

/**
 * Print the diff comparison of an error.
 *
 * @param {Error} err
 */
var printError = function (err) {
  // Log the error name with a description and optional diff.
  log(cross(err.name) + ': ' + chalk.red(err.message));

  // Log diffs when available.
  if (err.showDiff) {
    var actual   = err.actual;
    var expected = err.expected;

    if (_toString.call(actual) === _toString.call(expected)) {
      actual   = diffStringify(actual);
      expected = diffStringify(expected);
    }

    // Print the diff if both types are strings.
    if (typeof actual === 'string' && typeof expected === 'string') {
      log();
      printDiff(actual, expected);
    }
  }
};

/**
 * Log an error message to the user about the failed exercise.
 *
 * @param {Object} exercise
 * @param {Error}  err
 */
module.exports = function (exercise, err) {
  log();
  printError(err);
  log();
  log(chalk.bold.red('# FAIL'));
  log();
  log(
    'Your solution to "' + chalk.bold(exercise.name) + '" didn\'t work.',
    'Give it another go!'
  );
  log();
};
