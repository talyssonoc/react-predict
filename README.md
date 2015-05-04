# react-predict

ReactJS for input with autocomplete based on list of words.

[![Build Status](https://travis-ci.org/talyssonoc/react-predict.svg?branch=master)](https://travis-ci.org/talyssonoc/react-predict) [![Code Climate](https://codeclimate.com/github/talyssonoc/react-predict/badges/gpa.svg)](https://codeclimate.com/github/talyssonoc/react-predict)

## Installation

With npm:

```sh
  $ npm install react-predict
```

With Bower:

```sh
  $ bower install react-predict
```

Or use the files on `dist` folder.

__Don't forget to import the `react-predict.css` (or `react-predict.min.css`) file too.__

## Usage

```jsx
  var words = [
    'This',
    'is'
    'Sparta'
  ];

  React.render(<Predict words={ words } {...otherOptions /* See below */}/>,
              document.getElementById('search-box'));
```

## Options

You can pass the following props for Predict:

* words: Array of words or [jsT9](https://www.npmjs.com/package/jst9) instance. (default: `[]`)
* wordsSettings: If `words` option is an array, wordsSettings will be passed when instancing the jsT9 tree. (default: `{}`)
* itemComponent: Component that will wrap each of the suggested items. (default: `'div'`)
* itemProps: Properties of each of the suggested items. (default: `{}`)
* inputProps: Properties of the input field. (default: `{}`)
* fillOnChoose: If should fill the input when suggested item is clicked. (default: `true`)
* hideOnChoose: If should hide the suggestion list when item is clicked. (default: `true`)
* hideOnClickOutside: If should hide the suggestion list when it is clicked outside of it. (default: `true`)
