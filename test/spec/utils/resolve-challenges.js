var join    = require('path').join;
var expect  = require('chai').expect;
var resolve = require('../../../lib/utils/challenge/resolve');

/**
 * Path to the test fixtures directory.
 *
 * @type {String}
 */
var FIXTURES_DIR = join(__dirname, '../../fixtures');

/**
 * Get the directory of the example challenge for testing.
 *
 * @type {String}
 */
var EXAMPLE_CHALLENGE_DIR = join(
  FIXTURES_DIR, 'node_modules/code-challenge-example'
);

describe('resolve challenges', function () {
  it('should resolve local modules', function () {
    return resolve(FIXTURES_DIR)
      .then(function (modules) {
        expect(modules).to.contain(EXAMPLE_CHALLENGE_DIR);
      });
  });
});
