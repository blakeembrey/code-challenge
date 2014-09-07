var current            = require('../utils/store/current');
var printExercise      = require('../utils/cli/print-exercise');
var getCurrentExercise = require('../utils/cli/current-exercise');
var logNoNextExercise  = require('../utils/log/exercise/no-next');

/**
 * Proceed to the next exercise.
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
      var nextExercise = exercise.challenge.exercises[exercise.index + 1];

      // If this is the last exercise in the challenge, notify the user.
      if (!nextExercise) {
        return logNoNextExercise();
      }

      // Log the exercise to the user.
      printExercise(nextExercise);

      return current.set('exercise', nextExercise.name);
    });
};
