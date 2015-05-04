var autoCompletePath = '../../dist/react-predict.js';
var loremPath = '../support/lorem.json';

jest.dontMock(autoCompletePath);
jest.dontMock(loremPath);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var AutoComplete = require(autoCompletePath);
var lorem = require(loremPath);

describe('AutoComplete: `itemComponent`', function() {

  var expectedItems = [
    'labore',
    'laboris',
    'laborum'
  ];

  var MyComponent = React.createClass({
    render: function() {
      return (
        <strong/>
      );
    }
  });

  it('`itemComponent: \'span\'`', function() {

    var autoComplete = TestUtils.renderIntoDocument(
      <AutoComplete words={ lorem } itemComponent='span'/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(autoComplete, 'react-predict-input');

    input.getDOMNode().value = 'l';

    // Types "l"
    TestUtils.Simulate.change(input, {
      keyCode: 108
    });

    var items = TestUtils.scryRenderedDOMComponentsWithClass(autoComplete, 'react-predict-item');

    items.forEach(function(item, index) {
      var itemNode = item.getDOMNode();
      expect(itemNode.tagName).toMatch(/^span$/i);
      expect(itemNode.textContent).toEqual(expectedItems[index]);
    });

  });

  it('`itemComponent: MyComponent`', function() {

    var autoComplete = TestUtils.renderIntoDocument(
      <AutoComplete words={ lorem } itemComponent={ MyComponent }/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(autoComplete, 'react-predict-input');

    input.getDOMNode().value = 'l';

    // Types "l"
    TestUtils.Simulate.change(input, {
      keyCode: 108
    });

    var items = TestUtils.scryRenderedDOMComponentsWithClass(autoComplete, 'react-predict-item');

    items.forEach(function(item) {
      var itemNode = item.getDOMNode();
      expect(itemNode.tagName).toMatch(/^strong$/i);
      expect(itemNode.textContent).toEqual(expectedItems[index]);
    });

  });
});
