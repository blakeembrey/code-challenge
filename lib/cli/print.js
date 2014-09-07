var printExercise      = require('../utils/cli/print-exercise');
var getCurrentExercise = require('../utils/cli/current-exercise');

/**
 * Print the current challenge to the user.
 *
 * @return {Promise}
 */
module.exports = function () {
  return getCurrentExercise()
    .then(function (exercise) {
      if (exercise) {
        return printExercise(exercise);
      }
    });
};
