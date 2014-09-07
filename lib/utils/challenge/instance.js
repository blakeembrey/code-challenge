var Bluebird = require('bluebird');
var resolve  = Bluebird.promisify(require('resolve'));

/**
 * Resolve the modules code challenge instance.
 *
 * @param  {String}  dirname
 * @return {Promise}
 */
module.exports = function (dirname) {
  return resolve('code-challenge', { basedir: dirname });
};
