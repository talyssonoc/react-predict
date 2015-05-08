var keyCodes = {
  Enter : 13,
  Escape : 27,
  ArrowUp : 38,
  ArrowRight : 39,
  ArrowDown : 40
};

var ItemList = React.createClass({
  mixins: [OnClickOutside],

  handleClickOutside: function handleClickOutside() {
    this.props.handleClickOutside();
  },

  render: function() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
});

var Predict = React.createClass({

  getDefaultProps: function() {
    return {
      itemComponent: 'div',
      itemProps: {},
      inputProps: {},
      fillOnChoose: true,
      hideOnChoose: true,
      hideOnClickOutside: true,
      mapSuggestion: function indentity(suggestion) { return suggestion; },
      words: [],
      wordsSettings: {}
    };
  },

  getInitialState: function() {
    var treeAndWords = this._getTreeAndWords(this.props.words, this.props.wordsSettings);

    var words = treeAndWords.words;
    var tree = treeAndWords.tree;

    var itemClassName = classNames('react-predict-item',
                                this.props.itemProps.className);

    var inputClassName = classNames('react-predict-input',
                                this.props.inputProps.className);

    if(this.props.itemProps.className) {
      delete this.props.itemProps.className;
    }
    if(this.props.inputProps.className) {
      delete this.props.inputProps.className;
    }

    return {
      tree: tree,
      words: words,
      open: false,
      currentWord: '',
      selectedItemIndex: -1,
      mouseOverList: false,
      currentSuggestions: [],
      itemClassName: itemClassName,
      itemProps: this.props.itemProps,
      inputClassName: inputClassName,
      inputProps: this.props.inputProps
    };
  },

  _getTreeAndWords: function _getTreeAndWords(_words, _wordsSettings) {
    var words = [];
    var tree;

    if(jsT9 && _words instanceof jsT9) {
      tree = _words;
    }
    else {
      tree = new jsT9(_words, _wordsSettings);
      words = _words;
    }

    return {
      words: words,
      tree: tree
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
        this._handleChoose(selectedItem.dataset.suggestion);
      }
    }
    else if(isDirectionalKey) {
      this._changeSelectedItem(isDirectionalKey);
    }
  },

  _updateSuggestions: function _updateSuggestions(word) {
    word = word || this.state.currentWord;

    var suggestions = this.state.tree.predict(word);

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

  _hideItems: function _hideItems(isClickOutside) {
    if((isClickOutside && this.props.hideOnClickOutside) || !isClickOutside) {
      this.setState({
        open: false,
        selectedItemIndex: -1
      });
    }
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

    var listClassName = classNames('react-predict-list', { open: this.state.open });
    var selectedItemIndex = this.state.selectedItemIndex;
    var Item = this.props.itemComponent;

    var inputClassName = classNames('react-predict-input', this.state.inputClassName);

    var suggestionsList = [];

    if(this.state.open) {
      suggestionsList = this.state.currentSuggestions.map(function(suggestion, index) {
        var itemClassName = classNames(this.state.itemClassName, {
          hover: (index === selectedItemIndex)
        });

        var mappedSuggestion = this.props.mapSuggestion(suggestion);

        return (
          <Item
            className={ itemClassName }
            onClick={ this._handleChoose.bind(this, mappedSuggestion) }
            onMouseEnter={ this._setSelectedItem.bind(this, index) }
            onMouseLeave={ this._resetSelectedItem }
            key={ 'item_' + index }
            data-suggestion={ suggestion }
            data-mapped-suggestion={ mappedSuggestion }
            {...this.state.itemProps}>
              { mappedSuggestion }
          </Item>
        );

      }.bind(this));
    }

    return (
      <div className="react-predict">
        <input
          ref="input"
          type="text"
          className={ inputClassName }
          onKeyDown={ this._handleCommandInput }
          onChange={ this._handleInput }
          value={ this.state.currentWord }
          {...this.state.inputProps}/>

        <ItemList
          className={ listClassName }
          onMouseEnter={ this._setMouseOverList.bind(this, true) }
          onMouseLeave={ this._setMouseOverList.bind(this, false) }
          handleClickOutside={ this._hideItems.bind(this, true) }>
          { suggestionsList }
        </ItemList>
      </div>
    );
  }

});
