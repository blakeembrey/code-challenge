var chalk     = require('chalk');
var log       = require('../log/log');
var separator = require('../log/separator');
var command   = require('../log/command');

/**
 * Print the exercise to the command line.
 *
 * @param  {Object}  exercise
 * @return {Promise}
 */
module.exports = function (exercise) {
  var challenge       = exercise.challenge;
  var totalExercises  = challenge.exercises.length;
  var currentExercise = exercise.index + 1;

  log();
  log(chalk.green.bold.underline(challenge.name));
  log();
  log(chalk.yellow.bold(exercise.name));
  log(chalk.yellow('Exercise ' + currentExercise + ' of ' + totalExercises));
  log();
  separator();
  log();

  // Run the print script and log content afterward.
  return exercise.start('print')
    .then(function () {
      log();
      separator();
      log();
      log('Print these instructions again:');
      command('print');
      log('Execute your solution in a test environment:');
      command('run', '[ARGS]');
      log('Verify your solution:');
      command('verify', '[ARGS]');
      log('For help:');
      command('help');
      log();
    });
};
