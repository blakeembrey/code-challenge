var log     = require('../log');
var command = require('../command');

/**
 * Prompt the user to select an exercise.
 */
module.exports = function () {
  log();
  log('No exercise has been selected. To select an exercise:');
  log();
  command('exercise');
  log();
};
