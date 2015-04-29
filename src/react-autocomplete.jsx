var keyCodes = {
  Enter : 13,
  Escape : 27,
  ArrowUp : 38,
  ArrowRight : 39,
  ArrowDown : 40
};

var AutoComplete = React.createClass({

  getDefaultProps: function() {
    return {
      itemComponent: 'div',
      itemProps: {},
      inputProps: {},
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

    if(jsT9 && this.props.words instanceof jsT9) {
      words = this.props.words;
    }
    else {
      words = new jsT9(this.props.words, this.props.wordsSettings);
    }

    var itemClass = classNames('autocomplete-item',
                                this.props.itemProps.className);

    var inputClass = className('autocomplete-input',
                                this.props.inputProps.className);

    if(this.props.itemProps.className) {
      delete this.props.itemProps.className;
    }
    if(this.props.inputProps.className) {
      delete this.props.inputProps.className;
    }

    return {
      words: words,
      open: false,
      currentWord: '',
      selectedItemIndex: -1,
      mouseOverList: false,
      currentSuggestions: [],
      itemClass: itemClass,
      itemProps: this.props.itemProps,
      inputClass: inputClass,
      inputProps: this.props.inputProps
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
      this._hideItems();
    }
    else if(key === keyCodes.Enter) {
      if(this.state.selectedItemIndex > -1) {
        this._handleChoose(selectedItem.dataset.content);
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

  _hideItems: function _hideItems() {
    this.setState({
      open: false,
      selectedItemIndex: -1
    });
  },

  _changeSelectedItem: function _changeSelectedItem(quantity) {
    if(!this.state.mouseOverList) {
      this.setState(function(prevState) {
        var newIndex = (prevState.selectedItemIndex + quantity) % prevState.currentSuggestions.length;

        if(newIndex < 0) {
          newIndex = prevState.currentSuggestions.length - 1;
        }

        return {
          selectedItemIndex: newIndex
        };
      });
    }
  },

  _setSelectedItem: function _setSelectedItem(index) {
    this.setState({
      selectedItemIndex: index
    });
  },

  _resetSelectedItem: function _resetSelectedItem() {
    this.setState({
      selectedItemIndex: -1
    });
  },

  _setMouseOverList: function _setMouseOverList(mouseOverList) {
    this.setState({
      mouseOverList: mouseOverList
    });
  },

  _handleChoose: function _handleChoose(suggestion) {

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

    var inputClassName = classNames('autocomplete-input', this.state.inputClassName);

    var suggestionsList = this.state.currentSuggestions.map(function(suggestion, index) {
      var itemClassName = classNames(this.state.itemClass, {
        hover: (index === selectedItemIndex)
      });

      return (
        <ItemComponent
          className={ itemClassName }
          onClick={ this._handleChoose.bind(this, suggestion) }
          onMouseEnter={ this._setSelectedItem.bind(this, index) }
          onMouseLeave={ this._resetSelectedItem }
          ref={ 'item_' + index }
          data-content={ suggestion }
          {...this.state.itemProps}>
            { suggestion }
        </ItemComponent>
      );

    }.bind(this));

    return (
      <div className="autocomplete">
        <input
          ref="input"
          type="text"
          className="autocomplete-input"
          onKeyDown={ this._handleCommandInput }
          onChange={ this._handleInput }
          value={ this.state.currentWord }
          {...this.state.inputProps}/>

        <div
          className={ listClassName }
          onMouseEnter={ this._setMouseOverList.bind(this, true) }
          onMouseLeave={ this._setMouseOverList.bind(this, false) }>
          { suggestionsList }
        </div>
      </div>
    );
  }

});
