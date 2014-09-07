var fs     = require('fs');
var join   = require('path').join;
var expect = require('chai').expect;
var render = require('../../../lib/utils/render/content');

describe('render', function () {
  it('should render content with a language specification', function () {
    var input  = join(__dirname, '../../fixtures/active-model.rb');
    var output = join(__dirname, '../../fixtures/active-model.out');

    return render(fs.readFileSync(input, 'utf-8'), 'rb')
      .then(function (content) {
        expect(content.toString()).to.equal(fs.readFileSync(output, 'utf-8'));
      });
  });
});
