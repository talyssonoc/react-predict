var predictPath = '../../dist/react-predict.js';
var loremPath = '../support/lorem.json';

jest.dontMock(predictPath);
jest.dontMock(loremPath);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Predict = require(predictPath);
var lorem = require(loremPath);

describe('Predict: `inputProps`', function() {

  it('`inputProps`', function() {

    var predict = TestUtils.renderIntoDocument(
      <Predict words={ lorem } inputProps={{ className: 'my-input', name: 'user[name]' }}/>
    );

    var input = TestUtils.findRenderedDOMComponentWithClass(predict, 'react-predict-input');

    expect(input.getDOMNode().className).toContain('my-input');
    expect(input.getDOMNode().name).toEqual('user[name]');

  });
});
