var getCurrentExercise = require('../utils/cli/current-exercise');

/**
 * Run the current exercise.
 *
 * @param  {Array}   args
 * @return {Promise}
 */
module.exports = function (args) {
  return getCurrentExercise()
    .then(function (exercise) {
      if (!exercise) {
        return;
      }

      return exercise.start('verify', args).catch(function () {});
    });
};
