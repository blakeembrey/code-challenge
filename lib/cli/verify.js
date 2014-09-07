var complete           = require('../utils/store/complete');
var exerciseFailLog    = require('../utils/log/exercise/fail');
var exercisePassLog    = require('../utils/log/exercise/pass');
var getCurrentExercise = require('../utils/cli/current-exercise');

/**
 * Verify an exercise is working and passes successfully.
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

      // Run the exercise and pretty print any errors that occur.
      return exercise.start('verify', args)
        .then(function () {
          complete.add(exercise.challenge.dirname, exercise.name);

          return exercisePassLog(exercise);
        }, function (err) {
          return exerciseFailLog(exercise, err);
        });
    });
};
