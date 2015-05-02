var autoCompletePath = '../../dist/react-autocomplete.js';
var loremPath = '../support/lorem.json';

jest.dontMock(autoCompletePath);
jest.dontMock(loremPath);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var AutoComplete = require(autoCompletePath);
var lorem = require(loremPath);

describe('AutoComplete: `inputProps`', function() {

  it('`inputProps`', function() {

    var autoComplete = TestUtils.renderIntoDocument(
      <AutoComplete words={ lorem } inputProps={{ className: 'my-input', name: 'user[name]' }}/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(autoComplete, 'autocomplete-input');

    expect(input.getDOMNode().className).toContain('my-input');
    expect(input.getDOMNode().name).toEqual('user[name]');

  });
});
