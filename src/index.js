/*!
 * Modules deps
 */

var toFunction = require('to-function')

/**
 * Compare the values of an array based on some comparison 
 * and return the value that comes out on top. If you don't pass
 * a value for fn the values will be compared with `a > b`
 *
 *   winner([1,2,3]) // => 3
 *   winner([{a:1}, {a:2}], 'a') // => {a:2}
 *   winner([{a:1}, {a:2}], function(item){
 *     return item.a
 *   }) // => {a:2}
 * 
 * @param {Array} array
 * @param {String|RegExp|Function} [fn]
 * @param {Any} min, if no value is greater than this there is no winner
 * @return {Any}
 */

function max (array, fn, min) {
	var i = array.length
	if (!i) return
	if (fn) {
		if (typeof fn !== 'function') fn = toFunction(fn)
		var max = array[0]
		  , maxv = fn(max)
		
		for (var i = 0, len = array.length; i < len; i++) {
			var v = fn(array[i])
			if (v > maxv) {
				maxv = v
				max = array[i]
			}
		}
		
		return min != null 
			? maxv >= min 
				? max 
				: undefined
			: max
	} else {
		var max = array[0]
		
		for (var i = 0, len = array.length; i < len; i++) {
			if (array[i] > max) max = array[i]
		}
		
		return min != null 
			? max >= min 
				? max 
				: undefined
			: max
	}
}

module.exports = max