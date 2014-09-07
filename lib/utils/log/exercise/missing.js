var log     = require('../log');
var command = require('../command');

/**
 * Log missing exercises for user action.
 *
 * @param {String} exerciseName
 */
module.exports = function (exerciseName) {
  log();
  log(cross(
    'The exercise named "' + chalk.bold(exerciseName) + '" has disappeared'
  ));
  log();
  log('Please select a new exercise:');
  log();
  command('exercise');
  log();
};
