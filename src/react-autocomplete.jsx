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

var irrelevantKeys = [
  keyCodes.Ctrl,
  keyCodes.Shift,
  keyCodes.Alt,
  keyCodes.CapsLock,
  keyCodes.ArrowRight,
  keyCodes.ArrowLeft,
  keyCodes.PageDown,
  keyCodes.PageUp,
  keyCodes.Home,
  keyCodes.End
];

var AutoComplete = React.createClass({

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
    else if(this._isRelevantKey(key))
    )) {
      suggestions = this.state.words.predict(word);

      this.setState({
        currentWord: word,
        currentSuggestions: suggestions,
        open: !!suggestions.length
      });
    }
  },

  _isRelevantKey: function _isRelevantKey(key) {
    return irrelevantKeys.indexOf(key) > -1
          && !(e.ctrlKey && (key === keyCodes.charA || key === keyCodes.charC));
  },

  render: function() {

    var listClassName = classNames('autocomplete-list', { open: this.state.open });

    var ItemWrapper = this.props.itemWrapper;

    var suggestionsList = this.state.currentSuggestions.map(function(suggestion) {
      return (
        <ItemWrapper className={ this.state.itemWrapperClass } {...this.state.itemWrapperProps}>
          { suggestion }
        </ItemWrapper>
      );
    }.bind(this));

    return (
      <div className="autocomplete">
        <input ref="input" type="text" className="input" onKeyUp={ this._handleKeyUp }/>
        <div className={ listClassName }>
          { suggestionsList }
        </div>
      </div>
    );
  }

});
