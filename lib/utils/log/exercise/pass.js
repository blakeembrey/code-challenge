var chalk = require('chalk');
var log   = require('../log');
var check = require('../format/check');

/**
 * Log an error message to the user about the failed exercise.
 *
 * @param {Object} exercise
 * @param {Error}  err
 */
module.exports = function (exercise, err) {
  log();
  log(check('Your submission succeeded'));
  log();
  log(chalk.bold.green('# PASS'));
  log();
  log('Your solution to "' + chalk.bold(exercise.name) + '" worked!');
  log();
};
