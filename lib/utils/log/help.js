var chalk       = require('chalk');
var log         = require('./log');
var heading     = require('./heading');
var command     = require('./command');
var instruction = require('./instruction');

/**
 * Log the help menu for the user.
 */
module.exports = function () {
  log();
  heading('Usage: challenge <command>');

  command('select');
  instruction('Show a menu to select the challenge you would like to try.');

  command('exercise');
  instruction('Show a menu to select an exercise from the current challenge.');

  command('print');
  instruction('Print any instructions for the current exercise.');

  command('run', '[ARGS]');
  instruction('Run your solution to the exercise in a test environment.');

  command('verify', '[ARGS]');
  instruction('Verify whether your solution to the exercise works.');

  command('reset');
  instruction('Reset all challenge progress.');

  command('next');
  instruction('Proceed to the next exercise in the challenge.');

  command('prev');
  instruction('Return to the previous exercise in the challenge.');
  log();
};
