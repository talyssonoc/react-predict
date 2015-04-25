(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react', 'jst9'], function(React, jsT9) {
    	return (root.AutoComplete = factory(React, jsT9));
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(require('react'), require('jst9'));
  } else {
    root.AutoComplete = factory(root.React, root.jsT9);
  }
}(this, function(React, jsT9) {
'use strict';
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
      wordsSettings: {},
      keyCodes: {
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
      }
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

    var itemWrapperClass = 'jsAutoSuggestOption ';

    if(this.props.itemWrapperProps.className) {
      itemWrapperClass += this.props.itemWrapperProps.className;
    }

    var itemWrapperProps = this.props.itemWrapperProps;
    itemWrapperProps.className = itemWrapperClass;

    return {
      words: words,
      open: false,
      currentWord: '',
      currentSuggestions: [],
      itemWrapperProps: itemWrapperProps
    };
  },

  _handleKeyUp: function(e) {

    var keyCodes = this.props.keyCodes;
    var key = e.keyCode || e.charCode;
    var word = React.findDOMNode(this.refs.input).value;
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

      console.log(suggestions);

      this.setState({
        currentWord: word,
        currentSuggestions: suggestions,
        open: suggestions.length
      });
    }
  },

  render: function() {

    var listClassName = 'jsAutoSuggestList ';

    if(this.state.open) {
      listClassName += 'open';
    }

    var ItemWrapper = this.props.itemWrapper;

    var suggestionsList = this.state.currentSuggestions.map(function(suggestion) {
      return (
        React.createElement(ItemWrapper, React.__spread({},  this.state.itemWrapperProps), suggestion)
      );
    }.bind(this));

    return (
      React.createElement("div", null, 
        React.createElement("input", {ref: "input", type: "text", className: "inField", onKeyUp:  this._handleKeyUp}), 
        React.createElement("div", {className:  listClassName }, 
           suggestionsList 
        )
      )
    );
  }

});

return AutoComplete;
}));
