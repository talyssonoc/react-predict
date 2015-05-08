var predictPath = '../../dist/react-predict.js';
var loremPath = '../support/lorem.json';

jest.dontMock(predictPath);
jest.dontMock(loremPath);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Predict = require(predictPath);
var lorem = require(loremPath);

describe('Predict: `hideOnChoose`', function() {

  it('`hideOnChoose: true`', function() {

    var predict = TestUtils.renderIntoDocument(
      <Predict words={ lorem } hideOnChoose={ true }/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(predict, 'react-predict-input');

    input.getDOMNode().value = 'a';

    // Types "a"
    TestUtils.Simulate.change(input, {
      keyCode: 65
    });

    var items = TestUtils.scryRenderedDOMComponentsWithClass(predict, 'react-predict-item');

    TestUtils.Simulate.click(items[0]);

    var list = TestUtils.findRenderedDOMComponentWithClass(predict, 'react-predict-list');
    var items = TestUtils.scryRenderedDOMComponentsWithClass(predict, 'react-predict-item');

    expect(list.getDOMNode().className).not.toContain('open');
    expect(items.length).toBe(0);

  });

  it('`hideOnChoose: false`', function() {

    var predict = TestUtils.renderIntoDocument(
      <Predict words={ lorem } hideOnChoose={ false }/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(predict, 'react-predict-input');

    input.getDOMNode().value = 'a';

    // Types "a"
    TestUtils.Simulate.change(input, {
      keyCode: 65
    });

    var items = TestUtils.scryRenderedDOMComponentsWithClass(predict, 'react-predict-item');

    TestUtils.Simulate.click(items[0]);

    var list = TestUtils.findRenderedDOMComponentWithClass(predict, 'react-predict-list');
    var items = TestUtils.scryRenderedDOMComponentsWithClass(predict, 'react-predict-item');

    expect(list.getDOMNode().className).toContain('open');
    expect(items.length).toBe(7);

  });

});
