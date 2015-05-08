var predictPath = '../dist/react-predict.js';
var loremPath = './support/lorem.json';

jest.dontMock(predictPath);
jest.dontMock(loremPath);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Predict = require(predictPath);
var lorem = require(loremPath);

describe('Predict', function() {

  it('shows options when entered "l" on input', function() {

    var predict = TestUtils.renderIntoDocument(
      <Predict words={lorem}/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(predict, 'react-predict-input');

    input.getDOMNode().value = 'l';

    // Types "l"
    TestUtils.Simulate.change(input, {
      keyCode: 108
    });

    var list = TestUtils.findRenderedDOMComponentWithClass(predict, 'react-predict-list');
    var items = TestUtils.scryRenderedDOMComponentsWithClass(predict, 'react-predict-item');

    expect(items.length).toBe(3);

    var expectedItems = [
      'labore',
      'laboris',
      'laborum'
    ];

    expectedItems.forEach(function(item, index) {
      expect(items[index].getDOMNode().textContent).toEqual(item);
    });
  });

  it('adds hover class to element selected with arrows', function() {
    var predict = TestUtils.renderIntoDocument(
      <Predict words={lorem}/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(predict, 'react-predict-input');

    input.getDOMNode().value = 'l';

    // Types "l"
    TestUtils.Simulate.change(input, {
      keyCode: 180
    });

    // Clicks arrow down
    TestUtils.Simulate.keyDown(input, {
      keyCode: 40
    });

    var list = TestUtils.findRenderedDOMComponentWithClass(predict, 'react-predict-list');
    var items = TestUtils.scryRenderedDOMComponentsWithClass(predict, 'react-predict-item');

    expect(items[0].getDOMNode().className).toContain('hover');
    expect(items[1].getDOMNode().className).not.toContain('hover');
    expect(items[2].getDOMNode().className).not.toContain('hover');

  });

});
