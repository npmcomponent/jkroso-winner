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

describe('with comparators', function () {
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
  it('should return undefined if no values match the mimimum criteria', function () {
    should.not.exist(
      winner(arr, function (item) {
        return item.a
      }, 5)
    )
  })
})
