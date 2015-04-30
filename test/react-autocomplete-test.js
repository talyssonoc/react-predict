var autoCompletePath = '../dist/react-autocomplete.js';
var loremPath = './support/lorem.json';

jest.dontMock(autoCompletePath);
jest.dontMock(loremPath);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var AutoComplete = require(autoCompletePath);
var lorem = require(loremPath);

describe('AutoComplete', function() {

  it('shows options when entered "l" on input', function() {

    var autoComplete = TestUtils.renderIntoDocument(
      <AutoComplete words={lorem}/>
    );

    var input = TestUtils.findRenderedDOMComponentWithTag(autoComplete, 'input');

    input.getDOMNode().value = 'l';

    TestUtils.Simulate.change(input, {
      keyCode: 108
    });

    var list = TestUtils.findRenderedDOMComponentWithClass(autoComplete, 'autocomplete-list');

    var items = TestUtils.scryRenderedDOMComponentsWithClass(autoComplete, 'autocomplete-item');

    expect(items.length).toEqual(3);
  });

});
