var autoCompletePath = '../../dist/react-autocomplete.js';
var loremPath = '../support/lorem.json';

jest.dontMock(autoCompletePath);
jest.dontMock(loremPath);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var AutoComplete = require(autoCompletePath);
var lorem = require(loremPath);

describe('AutoComplete: `fillOnChoose`', function() {

  it('`fillOnChoose: true`', function() {

    var autoComplete = TestUtils.renderIntoDocument(
      <AutoComplete words={ lorem } fillOnChoose={ true }/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(autoComplete, 'autocomplete-input');

    input.getDOMNode().value = 'l';

    // Types "l"
    TestUtils.Simulate.change(input, {
      keyCode: 108
    });

    var items = TestUtils.scryRenderedDOMComponentsWithClass(autoComplete, 'autocomplete-item');

    TestUtils.Simulate.click(items[0]);

    expect(input.getDOMNode().value).toEqual('labore');

  });

  it('`fillOnChoose: false`', function() {

    var autoComplete = TestUtils.renderIntoDocument(
      <AutoComplete words={ lorem } fillOnChoose={ false }/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(autoComplete, 'autocomplete-input');

    input.getDOMNode().value = 'l';

    // Types "l"
    TestUtils.Simulate.change(input, {
      keyCode: 108
    });

    var items = TestUtils.scryRenderedDOMComponentsWithClass(autoComplete, 'autocomplete-item');

    TestUtils.Simulate.click(items[0]);

    expect(input.getDOMNode().value).toEqual('l');

  });
});
