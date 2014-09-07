var chalk = require('chalk');
var log   = require('../log');
var cross = require('../format/cross');

/**
 * Log an error message to the user about the failed exercise.
 *
 * @param {Object} exercise
 * @param {Error}  err
 */
module.exports = function (exercise, err) {
  log();
  log(cross(err.name));
  log();
  log(chalk.gray(err.message));
  log();
  log(chalk.bold.red('# FAIL'));
  log();
  log(
    'Your solution to "' + chalk.bold(exercise.name) + '" didn\'t work.',
    'Give it another go!'
  );
  log();
};
