var should = require('chai').should()
  , winner = require('../src')

describe('literal values', function () {
	it('should compare using >', function () {
		winner([1,2,3]).should.equal(3)
		winner(['a', 'b', 'c']).should.equal('c')
		winner([new Date(1), new Date(2), new Date(3)]).getTime().should.equal(new Date(3).getTime())
	})
	it('should return undefined for an empty array', function () {
		should.not.exist(winner([]))
	})
})

describe('with comparators', function () {
	it('should return the item not the value of the comparator', function () {
		winner([{a:1}, {a:2}, {a:3}], function (item) {
			return item.a
		}).should.deep.equal({a:3})
	})
	it('should return the first one if they are all the same', function () {
		var arr = [{a:1}, {a:1}, {a:1}]
		winner(arr, function (i) {
			return i.a
		}).should.equal(arr[0])
	})
})
