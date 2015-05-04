var autoCompletePath = '../../dist/react-predict.js';
var loremPath = '../support/lorem.json';

jest.dontMock(autoCompletePath);
jest.dontMock(loremPath);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var AutoComplete = require(autoCompletePath);
var lorem = require(loremPath);

describe('AutoComplete: `hideOnChoose`', function() {

  it('`hideOnChoose: true`', function() {

    var autoComplete = TestUtils.renderIntoDocument(
      <AutoComplete words={ lorem } hideOnChoose={ true }/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(autoComplete, 'react-predict-input');

    input.getDOMNode().value = 'a';

    // Types "a"
    TestUtils.Simulate.change(input, {
      keyCode: 65
    });

    var items = TestUtils.scryRenderedDOMComponentsWithClass(autoComplete, 'react-predict-item');

    TestUtils.Simulate.click(items[0]);

    var list = TestUtils.findRenderedDOMComponentWithClass(autoComplete, 'react-predict-list');
    var items = TestUtils.scryRenderedDOMComponentsWithClass(autoComplete, 'react-predict-item');

    expect(list.getDOMNode().className).not.toContain('open');
    expect(items.length).toBe(0);

  });

  it('`hideOnChoose: false`', function() {

    var autoComplete = TestUtils.renderIntoDocument(
      <AutoComplete words={ lorem } hideOnChoose={ false }/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(autoComplete, 'react-predict-input');

    input.getDOMNode().value = 'a';

    // Types "a"
    TestUtils.Simulate.change(input, {
      keyCode: 65
    });

    var items = TestUtils.scryRenderedDOMComponentsWithClass(autoComplete, 'react-predict-item');

    TestUtils.Simulate.click(items[0]);

    var list = TestUtils.findRenderedDOMComponentWithClass(autoComplete, 'react-predict-list');
    var items = TestUtils.scryRenderedDOMComponentsWithClass(autoComplete, 'react-predict-item');

    expect(list.getDOMNode().className).toContain('open');
    expect(items.length).toBe(7);

  });

});
