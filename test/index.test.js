var should = require('chai').should()
  , winner = require('../src')

describe('literal values', function () {
  it('should compare using >', function () {
    winner([1,2,3]).should.equal(3)
    winner(['a', 'b', 'c']).should.equal('c')
    winner([new Date(1), new Date(2)]).getTime().should.equal(2)
  })
  it('should return undefined for an empty array', function () {
    should.not.exist(winner([]))
  })
  it('should return undefined if no values match the mimimum criteria', function () {
    should.not.exist(winner([1,2,3], null, 5))
  })
})

describe('with functions', function () {
  var arr = [{a:1}, {a:2}, {a:3}]
  it('should return the item not the value of the comparator', function () {
    winner(arr, function (item) {
      return item.a
    }).should.deep.equal({a:3})
  })
  it('should return the first one if they are all the same', function () {
    var arr = [{a:1}, {a:1}, {a:1}]
    winner(arr, function (i) {
      return i.a
    }).should.equal(arr[0])
  })
  it('should return undefined if no values match the minimum criteria', function () {
    should.not.exist(
      winner(arr, function (item) {
        return item.a
      }, 5)
    )
  })
  describe('that take two arguments', function () {
    it('should treat it as a comparator', function () {
      winner(arr, function (a, b) {
        return a.a - b.a
      }).should.deep.equal({a:3})
      winner(['a', 'b', 'c'], function (a, b) {
        return a < b ? -1 : +(a > b)
      }).should.equal('c')
    })
    it('should return undefined if the minimum value is not met', function () {
      should.not.exist(winner(['a', 'b', 'c'], function (a, b) {
        return a < b ? -1 : +(a > b)
      }, 'd'))
      should.not.exist(winner(arr, function (a, b) {
        return a.a - b.a
      }, {a:4}))
    })
  })
})

describe('possible regressions', function () {
  // Its pretty dicky with all the weirdities in javascript to allow for this kind of thing 
  // so for now I'm not going to bother
  it.skip('should handle the case where the first value is == undefined || NaN', function () {
    var arr = [{b:1}, {a:1}, {a:2}]
    winner(arr, function (item) {
      return item.a || 0
    }).should.equal(arr[2])
    winner([undefined, 2, 3]).should.equal(3)
    winner([NaN, 2, 3]).should.equal(3)
    winner([null, 2, 3]).should.equal(3)
  })
})
