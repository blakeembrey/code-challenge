var current            = require('../utils/store/current');
var printExercise      = require('../utils/cli/print-exercise');
var getCurrentExercise = require('../utils/cli/current-exercise');
var logNoPrevExercise  = require('../utils/log/exercise/no-previous');

/**
 * Revert to the previous exercise in the challenge.
 *
 * @return {Promise}
 */
module.exports = function () {
  return getCurrentExercise()
    .then(function (exercise) {
      if (!exercise) {
        return;
      }

      // Select the next exercise in the challenge.
      var prevExercise = exercise.challenge.exercises[exercise.index - 1];

      // If this is the last exercise in the challenge, notify the user.
      if (!prevExercise) {
        return logNoPrevExercise();
      }

      // Log the exercise to the user.
      printExercise(prevExercise);

      return current.set('exercise', prevExercise.name);
    });
};
