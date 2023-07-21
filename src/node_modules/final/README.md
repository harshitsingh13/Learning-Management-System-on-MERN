# Final
[![npm version](https://badge.fury.io/js/final.svg)](https://badge.fury.io/js/final)
[![Build Status](https://travis-ci.org/nicolasmccurdy/final.svg?branch=master)](https://travis-ci.org/nicolasmccurdy/final)
[![Dependency Status](https://gemnasium.com/nicolasmccurdy/final.svg)](https://gemnasium.com/nicolasmccurdy/final)
[![Code Climate](https://codeclimate.com/github/nicolasmccurdy/final/badges/gpa.svg)](https://codeclimate.com/github/nicolasmccurdy/final)
[![Test Coverage](https://codeclimate.com/github/nicolasmccurdy/final/badges/coverage.svg)](https://codeclimate.com/github/nicolasmccurdy/final/coverage)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A set of tools for writing JavaScript code once that runs on the command line, browser, and more.

## Project Status
Final is in early (pre-1.0) development. It is usable, but its API may change frequently until it reaches 1.0. Additionally, several core features (and runners) have not been implemented yet.

## Examples
The examples below can be run in a Node.js script or shell.

### Getting Started
First, create an instance of `Command` with a function implementing the `Command`'s core. Skip to the Usage section for more information about how to write `Command`s.
```javascript
var adder = new final.Command(options => {
  var first = parseInt(options.first, 10)
  var second = parseInt(options.second, 10)

  return first + second
})
```
This `Command` exposes a `run()` method which wraps the given core with some extra type conversion and validation. This is the recommended way of running `Command`s. Note that your core function should treat all options as `String`s, since all inputs and outputs are converted to and from `String`s by the `run()` method.
```javascript
var result = adder.run({ first: 1, second: 2 }) // this returns a String
console.log(result)
```

### API Runner
Final can generate callbacks for Node's `http.Server` class, allowing you to wrap `Command`s in web APIs. You can also embed `Command`s in larger Node web apps.
```javascript
new final.API(adder).run()
```
Here, Final starts a web API at `localhost:3000` that wraps your `Command`. You can call it with HTTP requests like `GET localhost:3000?first=1&second=2`, and you will get a plain text response with the result.

### CLI Runner
Final can create command line interfaces around your `Command`.
```javascript
new final.CLI(adder).run()
```
Final will read arguments from the shell command running this JavaScript code, and
then it will immediately run the `Command` with the given options and print the
result to STDOUT. For example, try putting this in `add.js` and running
`node add --first 1 --second 2` in the same directory.

## Installation
1. Install [Node.js](https://nodejs.org/en/) (version 4 or higher)
2. `npm install --save final`
3. `var final = require ('final')`

## License
[ISC](LICENSE) (it's similar to MIT, but simpler)
