var predictPath = '../../dist/react-predict.js';
var loremPath = '../support/lorem.json';

jest.dontMock(predictPath);
jest.dontMock(loremPath);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Predict = require(predictPath);
var lorem = require(loremPath);

describe('Predict: `itemProps`', function() {

  it('`itemProps`', function() {

    var predict = TestUtils.renderIntoDocument(
      <Predict words={ lorem } itemProps={{ className: 'my-item' }}/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(predict, 'react-predict-input');

    input.getDOMNode().value = 'l';

    // Types "l"
    TestUtils.Simulate.change(input, {
      keyCode: 108
    });

    var items = TestUtils.scryRenderedDOMComponentsWithClass(predict, 'react-predict-item');

    items.forEach(function(item, index) {
      expect(item.getDOMNode().className).toContain('my-item');
    });

  });
});
