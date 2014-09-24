var chalk     = require('chalk');
var log       = require('../log');
var check     = require('../format/check');
var command   = require('../command');
var separator = require('../separator');

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
  separator();
  log();

  if (exercise.index < exercise.challenge.exercises.length - 1) {
    log('Proceed to the next exercise:');
    command('next');
    log('Go back to the previous exercise:');
    command('prev');
  } else {
    log('All exercises complete! Try a new challenge:');
    command('select');
  }

  log();
};
