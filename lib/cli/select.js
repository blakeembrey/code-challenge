var chalk              = require('chalk');
var Bluebird           = require('bluebird');
var list               = require('../utils/cli/list');
var current            = require('../utils/store/current');
var check              = require('../utils/log/format/check');
var logNoChallenges    = require('../utils/log/challenge/none');
var printChallenge     = require('../utils/cli/print-challenge');
var requireChallenge   = require('../utils/challenge/require');
var resolveChallenges  = require('../utils/challenge/resolve');
var challengeCompleted = require('../utils/challenge/complete');

/**
 * Select a challenge from the CLI and persist selection.
 *
 * @return {Promise}
 */
module.exports = function () {
  return resolveChallenges(process.cwd())
    .then(function (dirs) {
      if (!dirs.length) {
        return logNoChallenges();
      }

      // Then resolve each local modules challenge.
      return Bluebird.all(dirs.map(requireChallenge))
        .then(function (challenges) {
          return Bluebird.all(challenges.map(challengeCompleted))
            .then(function (completed) {
              // Iterate over each of module and create the list items.
              var items = challenges.map(function (challenge, index) {
                var dir  = dirs[index];
                var name = chalk.stripColor(challenge.name);

                // If the challenge has been fully completed, check it.
                if (completed[index]) {
                  name = check(name);
                }

                return [dir, name];
              }).sort(function (a, b) {
                return a[1] > b[1];
              });

              // Render the list with the current challenge selected.
              return current.get('challenge')
                .then(function (currentChallenge) {
                  return list(items, {
                    selected: currentChallenge,
                    footer: 'Press ENTER to select the challenge'
                  });
                });
            })
            .then(function (select) {
              if (select.action !== 'select') {
                return;
              }

              // Print the current challenge to the command line.
              printChallenge(challenges[dirs.indexOf(select.item)])
                .then(function () {
                  return current.set('challenge', select.item);
                });
            });
        });
    });
};
