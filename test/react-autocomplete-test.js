var autoCompletePath = '../dist/react-autocomplete.js';
var loremPath = './support/lorem.json';

jest.dontMock(autoCompletePath);
jest.dontMock(loremPath);

// var React = require('react/addons');
// var TestUtils = React.addons.TestUtils;
// var AutoComplete = require(autoCompletePath);
var lorem = require(loremPath);

describe('AutoComplete', function() {

  it('shows options when entered "l" on input', function() {
    expect(2).toEqual(50);

    // var autoComplete = TestUtils.renderIntoDocument(
    //   <AutoComplete words={lorem}/>
    // );

    // var input = TestUtils.findRenderedDOMComponentWithTag(autoComplete, 'input');

    // TestUtils.Simulate.change(input, {
    //   keyCode: 108
    // });

    // var list = TestUtils.findRenderedDOMComponentWithClass(autoComplete, 'autocomplete-list');

    // var items = TestUtils.scryRenderedDOMComponentsWithClass(list, 'autocomplete-item');

    // expect(items.length).toEqual('3');
  });

});
