var current             = require('../store/current');
var findExercise        = require('../challenge/find-exercise');
var logEmptyExercise    = require('../log/exercise/empty');
var logMissingExercise  = require('../log/exercise/missing');
var getCurrentChallenge = require('./current-challenge');

/**
 * Attempt to load the current exercise, logging any required user action.
 *
 * @return {Promise}
 */
module.exports = function () {
  return getCurrentChallenge()
    .then(function (challenge) {
      if (!challenge) {
        return;
      }

      return current.get('exercise')
        .then(function (exerciseName) {
          if (!exerciseName) {
            return logEmptyExercise();
          }

          var exercise = findExercise(challenge, exerciseName);

          if (!exercise) {
            return logEmptyExercise(exerciseName);
          }

          return exercise;
        });
    });
};
