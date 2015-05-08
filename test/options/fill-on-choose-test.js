var predictPath = '../../dist/react-predict.js';
var loremPath = '../support/lorem.json';

jest.dontMock(predictPath);
jest.dontMock(loremPath);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Predict = require(predictPath);
var lorem = require(loremPath);

describe('Predict: `fillOnChoose`', function() {

  it('`fillOnChoose: true`', function() {

    var predict = TestUtils.renderIntoDocument(
      <Predict words={ lorem } fillOnChoose={ true }/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(predict, 'react-predict-input');

    input.getDOMNode().value = 'l';

    // Types "l"
    TestUtils.Simulate.change(input, {
      keyCode: 108
    });

    var items = TestUtils.scryRenderedDOMComponentsWithClass(predict, 'react-predict-item');

    TestUtils.Simulate.click(items[0]);

    expect(input.getDOMNode().value).toEqual('labore');

  });

  it('`fillOnChoose: false`', function() {

    var predict = TestUtils.renderIntoDocument(
      <Predict words={ lorem } fillOnChoose={ false }/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(predict, 'react-predict-input');

    input.getDOMNode().value = 'l';

    // Types "l"
    TestUtils.Simulate.change(input, {
      keyCode: 108
    });

    var items = TestUtils.scryRenderedDOMComponentsWithClass(predict, 'react-predict-item');

    TestUtils.Simulate.click(items[0]);

    expect(input.getDOMNode().value).toEqual('l');

  });
});
