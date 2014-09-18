var glob     = require('glob');
var path     = require('path');
var Bluebird = require('bluebird');
var isWin    = process.platform === 'win32';

/**
 * Convert a directory lookup into a global node modules path lookup.
 *
 * @param  {String} dir
 * @return {Array}
 */
var toNpmPaths = function (dir) {
  // Initialize the paths to every directory level until the root directory.
  var paths = dir.split(path.sep).map(function (part, index, parts) {
    return path.resolve.apply(
      path, ['/'].concat(parts.slice(0, index + 1)).concat('node_modules')
    );
  }).reverse();

  // Push the node path environment variable onto the path stack.
  if (process.env.NODE_PATH) {
    paths.push.apply(paths, process.env.NODE_PATH.split(path.delimiter));
  }

  // Global node modules will normally be up from the current directory.
  paths.push(path.join(__dirname, '../../../../../node_modules'));

  // Push the global path based on the current executable path.
  paths.push(path.join(
    process.execPath, isWin ? '..' : '../../lib', 'node_modules'
  ));

  // Filter duplicate paths.
  return paths.filter(function (path, index, paths) {
    return paths.indexOf(path) === index;
  });
};

/**
 * Resolve requirable challanges.
 *
 * @param  {String}  baseDir
 * @return {Promise}
 */
module.exports = function (baseDir) {
  return new Bluebird(function (resolve, reject) {
    (function search (matches, paths) {
      if (!paths.length) {
        return resolve(matches);
      }

      return glob('code-challenge-*', { cwd: paths[0] }, function (err, found) {
        if (err) {
          return reject(err);
        }

        return search(matches.concat(found.map(function (module) {
          return path.join(paths[0], module);
        })), paths.slice(1));
      });
    })([], toNpmPaths(baseDir));
  });
};
