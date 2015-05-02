# react-autocomplete

ReactJS for input with autocomplete based on list of words.

[![Build Status](https://travis-ci.org/talyssonoc/react-autocomplete.svg?branch=master)](https://travis-ci.org/talyssonoc/react-autocomplete) [![Code Climate](https://codeclimate.com/github/talyssonoc/react-autocomplete/badges/gpa.svg)](https://codeclimate.com/github/talyssonoc/react-autocomplete)

## Installation

With npm:

```sh
  $ npm install react-autocomplete
```

With Bower:

```sh
  $ bower install react-autocomplete
```

Or use the files on `dist` folder.

__Don't forget to import the `react-autocomplete.css` (or `react-autocomplete.min.css`) file too.__

## Usage

```jsx
  var words = [
    'This',
    'is'
    'Sparta'
  ];

  React.render(<AutoComplete words={ words } {...otherOptions /* See below */}/>,
              document.getElementById('search-box'));
```

## Options

You can pass the following props for AutoComplete:

* words: Array of words or [jsT9](https://www.npmjs.com/package/jst9) instance. (default: `[]`)
* wordsSettings: If `words` option is an array, wordsSettings will be passed when instancing the jsT9 tree. (default: `{}`)
* itemComponent: Component that will wrap each of the suggested items. (default: `'div'`)
* itemProps: Properties of each of the suggested items. (default: `{}`)
* inputProps: Properties of the input field. (default: `{}`)
* fillOnChoose: If should fill the input when suggested item is clicked. (default: `true`)
* hideOnChoose: If should hide the suggestion list when item is clicked. (default: `true`)
* hideOnClickOutside: If should hide the suggestion list when it is clicked outside of it. (default: `true`)
