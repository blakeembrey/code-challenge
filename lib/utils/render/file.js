var Bluebird   = require('bluebird');
var map        = require('language-map');
var detect     = Bluebird.promisify(require('language-detect'));
var readFile   = Bluebird.promisify(require('fs').readFile);
var render     = require('./content');

/**
 * Render a file with syntax highlighting.
 *
 * @param  {String}  file
 * @param  {String}  [format]
 * @return {Promise}
 */
module.exports = function (file, format) {
  return detect(file)
    .then(function (language) {
      var extensions = (map[language] || {}).extensions;
      var shortName  = extensions && extensions[0].substr(1);

      return readFile(file, 'utf-8')
        .then(function (content) {
          return render(content, shortName, format);
        });
    });
};
