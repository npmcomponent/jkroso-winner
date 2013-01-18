# Winner

Compare the items of an array and return the biggest.
Compare the values of an array based on some comparison and return the value that comes out on top.If you don't pass a value for fn the values will be compared with `a > b`. If you pass a two argument function it will be treated as a comparitor see [Array#sort](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort) for how that works. Otherwise its return value will be used for comparison in place of the actual value.

## Getting Started

__With component(1)__ 

`component install jkroso/winner`

__In Node.js__ 

`npm install jkroso/winner --save`

Then its a good idea to add winner to your `bundledDependencies` array in your package.json file if you are planning to publish. This is just until npm completes its support for github packages 

## API

```javascript
var winner = require('winner')
```
