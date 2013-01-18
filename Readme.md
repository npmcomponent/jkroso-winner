# Winner

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
  - [winner()](#winner)

### winner()

  Pick the best value from an array.
  
  Caveats:
    
  - undefined, null, and NaN can't be compared to anything
  - strings can only be compared to numbers if they can coerce to numbers 
    
```js
winner([1,2,3]) // => 3
winner([{a:1}, {a:2}], 'a') // => {a:2}
winner([{a:1}, {a:2}], function(item){
  return item.a
}) // => {a:2}
winner(['a', 'b', 'c'], function(a, b){
  if (a < b) return -1
  return +(a > b)
}, 'd') // => undefined
```

## Spec
   - [literal values](#literal-values)
   - [with functions](#with-functions)
     - [that take two arguments](#with-functions-that-take-two-arguments)
<a name=""></a>
 
<a name="literal-values"></a>
### literal values
should compare using >.

```js
winner([1,2,3]).should.equal(3)
winner(['a', 'b', 'c']).should.equal('c')
winner([new Date(1), new Date(2)]).getTime().should.equal(2)
```

should return undefined for an empty array.

```js
should.not.exist(winner([]))
```

should return undefined if no values match the mimimum criteria.

```js
should.not.exist(winner([1,2,3], null, 5))
```

<a name="with-functions"></a>
### with functions
should return the item not the value of the comparator.

```js
winner(arr, function (item) {
  return item.a
}).should.deep.equal({a:3})
```

should return the first one if they are all the same.

```js
var arr = [{a:1}, {a:1}, {a:1}]
winner(arr, function (i) {
  return i.a
}).should.equal(arr[0])
```

should return undefined if no values match the minimum criteria.

```js
should.not.exist(
  winner(arr, function (item) {
    return item.a
  }, 5)
)
```

<a name="with-functions-that-take-two-arguments"></a>
### that take two arguments
should treat it as a comparator.

```js
winner(arr, function (a, b) {
  return a.a - b.a
}).should.deep.equal({a:3})
winner(['a', 'b', 'c'], function (a, b) {
  return a < b ? -1 : +(a > b)
}).should.equal('c')
```

should return undefined if the minimum value is not met.

```js
should.not.exist(winner(['a', 'b', 'c'], function (a, b) {
  return a < b ? -1 : +(a > b)
}, 'd'))
should.not.exist(winner(arr, function (a, b) {
  return a.a - b.a
}, {a:4}))
```

## Running the tests

Before you can run any tests you will need to execute `$ npm install`

Running the test in node is just a matter of executing `$ make test`

Running in the browser though requires a build. To do that execute `$ make test/built.js`. If all goes well you should then be able to open your browser to the test directory and watch the test suite run.

_Note: these commands don't work on windows._ 

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Jakeb Rosoman

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
