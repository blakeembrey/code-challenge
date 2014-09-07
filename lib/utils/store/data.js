var join      = require('path').join;
var crypto    = require('crypto');
var Bluebird  = require('bluebird');
var mkdirp    = Bluebird.promisify(require('mkdirp'));
var unlink    = Bluebird.promisify(require('fs').unlink);
var readdir   = Bluebird.promisify(require('fs').readdir);
var readFile  = Bluebird.promisify(require('fs').readFile);
var writeFile = Bluebird.promisify(require('fs').writeFile);

/**
 * Set the configuration directory to save data.
 *
 * @type {String}
 */
var HOME_DIR   = process.env.HOME || process.env.USERPROFILE;
var CONFIG_DIR = join(HOME_DIR, '.config', 'code-challenge');

/**
 * Return the file name of a string.
 *
 * @param  {String} name
 * @return {String}
 */
var filename = function (name) {
  return crypto.createHash('sha1').update(name).digest('hex') + '.json';
};

/**
 * Get a value persisted in the file system.
 *
 * @param  {String}  name
 * @return {Promise}
 */
exports.get = function (name) {
  return readFile(join(CONFIG_DIR, filename(name)), 'utf8')
    .then(JSON.parse)
    .catch(function () {
      return null;
    });
};

/**
 * Set a value to be persisted in the file system.
 *
 * @param {String}  name
 * @param {Object}  value
 * @param {Promise}
 */
exports.set = function (name, value) {
  return mkdirp(CONFIG_DIR)
    .then(function () {
      return writeFile(join(CONFIG_DIR, filename(name)), JSON.stringify(value))
        .return(value);
    });
};

/**
 * Remove a value from persistence.
 *
 * @param  {String}  name
 * @return {Promise}
 */
exports.remove = function (name) {
  return unlink(join(CONFIG_DIR, filename(name)));
};

/**
 * Reset everything.
 *
 * @return {[type]} [description]
 */
exports.reset = function () {
  return readdir(CONFIG_DIR)
    .then(function (files) {
      return Bluebird.all(files.map(function (file) {
        return unlink(join(CONFIG_DIR, file));
      }));
    });
};
