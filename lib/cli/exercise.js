var chalk               = require('chalk');
var check               = require('../utils/log/format/check');
var current             = require('../utils/store/current');
var complete            = require('../utils/store/complete');
var list                = require('../utils/cli/list');
var getCurrentChallenge = require('../utils/cli/current-challenge');
var printExercise       = require('../utils/cli/print-exercise');
var findExercise        = require('../utils/challenge/find-exercise');

/**
 * Select an exercise from the current challenge.
 *
 * @return {Promise}
 */
module.exports = function () {
  return getCurrentChallenge()
    .then(function (challenge) {
      if (!challenge) {
        return;
      }

      return complete.get(challenge.dirname)
        .then(function (completed) {
          // Map the exercises to their names, keeping the same order.
          var items = challenge.exercises.map(function (exercise) {
            var name = chalk.stripColor(exercise.name);

            // Render the name with a checkmark when completed.
            if (completed.indexOf(exercise.name) > -1) {
              name = check(name);
            }

            return [exercise.name, name];
          });

          // List the exercises with the current exercise selected.
          return current.get('exercise')
            .then(function (currentExercise) {
              return list(items, {
                selected: currentExercise,
                footer: 'Press ENTER to use an exercise'
              });
            })
            .then(function (select) {
              if (select.action !== 'select') {
                return;
              }

              // Find the exercise in the current challenge.
              var exercise = findExercise(challenge, select.item);

              // Print the exercise, then persist the selection.
              return printExercise(exercise)
                .then(function () {
                  return current.set('exercise', exercise.name);
                });
            });
        });
    });
};
