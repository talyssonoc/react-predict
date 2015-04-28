(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react', 'jst9', 'classnames'], function(React, jsT9, classNames) {
    	return (root.AutoComplete = factory(React, jsT9, classNames));
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(require('react'), require('jst9'), require('classnames'));
  } else {
    root.AutoComplete = factory(root.React, root.jsT9, root.classNames);
  }
}(this, function(React, jsT9, classNames) {
'use strict';
var keyCodes = {
  Backspace : 8,
  Enter : 13,
  Shift : 16,
  Ctrl : 17,
  Alt : 18,
  CapsLock : 20,
  Escape : 27,
  PageUp : 33,
  PageDown : 34,
  End : 35,
  Home : 36,
  ArrowLeft : 37,
  ArrowUp : 38,
  ArrowRight : 39,
  ArrowDown : 40,
  Delete : 46,
  charA : 65,
  charC : 67
};

var AutoComplete = React.createClass({displayName: "AutoComplete",

  getDefaultProps: function() {
    return {
      itemWrapper: 'div',
      itemWrapperProps: {},
      hideOnChoose: true,
      fillOnChoose: true,
      hideOnClickOutside: true,
      debounce: false,
      debounceTime: 500,
      words: [],
      wordsSettings: {}
    };
  },

  getInitialState: function() {
    var words;

    if(this.props.words instanceof jsT9) {
      words = this.props.words;
    }
    else {
      words = new jsT9(this.props.words, this.props.wordsSettings);
    }

    var itemWrapperClass = classNames('autocomplete-option',
                                      this.props.itemWrapperProps.className);

    if(this.props.itemWrapperProps.className) {
      delete this.props.itemWrapperProps.className;
    }

    return {
      words: words,
      open: false,
      currentWord: '',
      currentSuggestions: [],
      itemWrapperClass: itemWrapperClass,
      itemWrapperProps: this.props.itemWrapperProps
    };
  },

  _handleKeyUp: function(e) {
    var word = React.findDOMNode(this.refs.input).value;
    var key = e.keyCode || e.charCode;
    var suggestions;

    if(!word.length) {
      this.setState({
        currentWord: word,
        currentSuggestions: [],
        open: false
      });
    }
    else if(key === keyCodes.Escape) {
      this.setState({
        open: false
      });
    }
    else if(!(key === keyCodes.Ctrl
          || key === keyCodes.Shift
          || key === keyCodes.Alt
          || key === keyCodes.CapsLock
          || key === keyCodes.ArrowRight
          || key === keyCodes.ArrowLeft
          || key === keyCodes.PageDown
          || key === keyCodes.PageUp
          || key === keyCodes.Home
          || key === keyCodes.End
          || (e.ctrlKey && (key === keyCodes.charA || key === keyCodes.charC))
    )) {
      suggestions = this.state.words.predict(word);

      this.setState({
        currentWord: word,
        currentSuggestions: suggestions,
        open: !!suggestions.length
      });
    }
  },

  render: function() {

    var listClassName = classNames('autocomplete-list', { open: this.state.open });

    var ItemWrapper = this.props.itemWrapper;

    var suggestionsList = this.state.currentSuggestions.map(function(suggestion) {
      return (
        React.createElement(ItemWrapper, React.__spread({className:  this.state.itemWrapperClass},  this.state.itemWrapperProps), 
           suggestion 
        )
      );
    }.bind(this));

    return (
      React.createElement("div", {className: "autocomplete"}, 
        React.createElement("input", {ref: "input", type: "text", className: "input", onKeyUp:  this._handleKeyUp}), 
        React.createElement("div", {className:  listClassName }, 
           suggestionsList 
        )
      )
    );
  }

});

return AutoComplete;
}));
