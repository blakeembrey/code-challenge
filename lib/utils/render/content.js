var _          = require('lodash');
var Bluebird   = require('bluebird');
var readFile   = Bluebird.promisify(require('fs').readFile);
var pygmentize = Bluebird.promisify(require('pygmentize-bundled'));

/**
 * Render static content with syntax highlighting.
 *
 * @param  {String}  content
 * @param  {String}  language
 * @param  {String}  [format]
 * @return {Promise}
 */
module.exports = function (content, language, format) {
  format = format || 'terminal256';

  return pygmentize({ lang: language, format: format }, content)
    .catch(isOperationError, _.constant(content));
};

/**
 * Check if an error is an operational error instance.
 *
 * @param  {Error}   err
 * @return {Boolean}
 */
function isOperationError (err) {
  return err.name === 'OperationalError';
};
