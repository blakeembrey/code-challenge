var _         = require('lodash');
var chalk     = require('chalk');
var log       = require('../log/log');
var separator = require('../log/separator');
var command   = require('../log/command');
var complete  = require('../store/complete');

/**
 * Print a challenge to the command line.
 *
 * @param  {Object}  challenge
 * @return {Promise}
 */
module.exports = function (challenge) {
  return complete.get(challenge.dirname)
    .then(function (exercises) {
      var total     = challenge.exercises.length;
      var names     = _.pluck(challenge.exercises, 'name');
      var completed = _.intersection(exercises, names).length;

      log();
      log(chalk.green.bold.underline(challenge.name));
      log();
      log(chalk.yellow(total + ' Exercises (' + completed + ' Completed)'));
      log();
      separator();
      log();
      log('Select an exercise:');
      command('exercise');
      log('Select a different challenge:');
      command('select');
      log('For help:');
      command('help');
      log();
    });
};
