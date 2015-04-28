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
  Enter : 13,
  ArrowUp : 38,
  ArrowRight : 39,
  ArrowDown : 40
};

var AutoComplete = React.createClass({displayName: "AutoComplete",

  getDefaultProps: function() {
    return {
      itemComponent: 'div',
      itemProps: {},
      hideOnChoose: true,
      fillOnChoose: true,
      hideOnClickOutside: true,
      debounce: false,
      debounceTime: 500,
      words: [],
      wordsSettings: {},
      fillOnChoose: true,
      hideOnChoose: true
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

    var itemClass = classNames('autocomplete-item',
                                      this.props.itemProps.className);

    if(this.props.itemProps.className) {
      delete this.props.itemProps.className;
    }

    return {
      words: words,
      open: false,
      currentWord: '',
      selectedItemIndex: -1,
      currentSuggestions: [],
      itemClass: itemClass,
      itemProps: this.props.itemProps
    };
  },

  _getKey: function _getKey(event) {
    return event.keyCode || event.charCode;
  },

  _handleInput: function(event) {
    var word = React.findDOMNode(this.refs.input).value;
    var key = this._getKey(event);

    this.setState({
      currentWord: word,
      selectedItemIndex: -1
    });

    if(!word.length) {
      this._handleEmptyInput();
    }
    else {
      this._updateSuggestions(word);
    }

  },

  _handleCommandInput: function _handleCommandInput(event) {
    var key = this._getKey(event);
    var isDirectionalKey = this._isDirectionalKey(key);
    var selectedItemRef = this.refs['item_' + this.state.selectedItemIndex];
    var selectedItem;

    if(this.state.selectedItemIndex > -1) {
      selectedItem = React.findDOMNode(selectedItemRef);
    }

    if(key === keyCodes.Escape) {
      this._closeItems();
    }
    else if(key === keyCodes.Enter) {
      if(this.state.selectedItemIndex > -1) {
        this._handleSelect(selectedItem.dataset.content);
      }
    }
    else if(isDirectionalKey) {
      this._changeSelectedItem(isDirectionalKey);
    }
  },

  _updateSuggestions: function _updateSuggestions(word) {
    word = word || this.state.currentWord;

    var suggestions = this.state.words.predict(word);

    this.setState({
      currentSuggestions: suggestions,
      open: !!suggestions.length
    });
  },

  _handleEmptyInput: function _handleEmptyInput() {
    this.setState({
      currentSuggestions: [],
      open: false
    });
  },

  _closeItems: function _closeItems() {
    this.setState({
      open: false
    });
  },

  _changeSelectedItem: function _changeSelectedItem(quantity) {
    this.setState(function(prevState) {
      var newIndex = (prevState.selectedItemIndex + quantity) % prevState.currentSuggestions.length;

      if(newIndex < 0) {
        newIndex = prevState.currentSuggestions.length - 1;
      }

      return {
        selectedItemIndex: newIndex
      };
    });
  },

  _handleSelect: function _handleSelect(suggestion) {

    var stateAfterSelect = {};

    if(this.props.fillOnChoose) {
      stateAfterSelect.currentWord = suggestion;
    }

    if(this.props.hideOnChoose) {
      stateAfterSelect.open = false;
    }

    this.setState(stateAfterSelect);
  },

  _isDirectionalKey: function _isDirectionalKey(key) {
    if(key === keyCodes.ArrowUp) {
      return -1;
    }

    if(key === keyCodes.ArrowDown) {
      return 1;
    }

    return 0;
  },

  render: function() {

    var listClassName = classNames('autocomplete-list', { open: this.state.open });
    var selectedItemIndex = this.state.selectedItemIndex;
    var ItemComponent = this.props.itemComponent;

    var suggestionsList = this.state.currentSuggestions.map(function(suggestion, index) {
      var itemClassName = classNames(this.state.itemClass, {
        hover: (index === selectedItemIndex)
      });

      return (
        React.createElement(ItemComponent, React.__spread({
          className:  itemClassName, 
          onClick:  this._handleSelect.bind(this, suggestion), 
          ref:  'item_' + index, 
          "data-content":  suggestion }, 
          this.state.itemProps), 
             suggestion 
        )
      );

    }.bind(this));

    return (
      React.createElement("div", {className: "autocomplete"}, 
        React.createElement("input", {
          ref: "input", 
          type: "text", 
          className: "autocomplete-input", 
          onKeyDown:  this._handleCommandInput, 
          onChange:  this._handleInput, 
          value:  this.state.currentWord}), 

        React.createElement("div", {className:  listClassName }, 
           suggestionsList 
        )
      )
    );
  }

});

return AutoComplete;
}));
