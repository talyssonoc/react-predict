var autoCompletePath = '../../dist/react-autocomplete.js';
var loremPath = '../support/lorem.json';

jest.dontMock(autoCompletePath);
jest.dontMock(loremPath);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var AutoComplete = require(autoCompletePath);
var lorem = require(loremPath);

describe('AutoComplete: `itemProps`', function() {

  it('`itemProps`', function() {

    var autoComplete = TestUtils.renderIntoDocument(
      <AutoComplete words={ lorem } itemProps={{ className: 'my-item' }}/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(autoComplete, 'autocomplete-input');

    input.getDOMNode().value = 'l';

    // Types "l"
    TestUtils.Simulate.change(input, {
      keyCode: 108
    });

    var items = TestUtils.scryRenderedDOMComponentsWithClass(autoComplete, 'autocomplete-item');

    items.forEach(function(item, index) {
      expect(item.getDOMNode().className).toContain('my-item');
    });

  });
});
