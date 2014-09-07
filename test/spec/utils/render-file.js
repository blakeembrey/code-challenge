var fs         = require('fs');
var join       = require('path').join;
var expect     = require('chai').expect;
var renderFile = require('../../../lib/utils/render/file');

describe('render file', function () {
  it('should render the file based on file type', function () {
    var input  = join(__dirname, '../../fixtures/active-model.rb');
    var output = join(__dirname, '../../fixtures/active-model.out');

    return renderFile(input)
      .then(function (content) {
        expect(content.toString()).to.equal(fs.readFileSync(output, 'utf-8'));
      });
  });
});
