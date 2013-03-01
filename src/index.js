/*!
 * Modules deps
 */

var toFunction = require('to-function')

/**
 * Pick the best value from an array.
 * 
 * Caveats:
 *   
 * - undefined, null, and NaN can't be compared to anything
 * - strings can only be compared to numbers if they can coerce to numbers 
 *   
 *   winner([1,2,3]) // => 3
 *   winner([{a:1}, {a:2}], 'a') // => {a:2}
 *   winner([{a:1}, {a:2}], function(item){
 *     return item.a
 *   }) // => {a:2}
 *   winner(['a', 'b', 'c'], function(a, b){
 *     if (a < b) return -1
 *     return +(a > b)
 *   }, 'd') // => undefined
 *   
 * @param {Array} array
 * @param {String|RegExp|Function} [fn]
 * @param {Any} min, if no value is greater than this there is no winner
 * @return {Any}
 */

function winner (array, fn, min) {
	var len = array.length
	if (!len) return
	if (fn) {
		if (typeof fn !== 'function') fn = toFunction(fn)
		// Its a comparitor function
		if (fn.length > 1) {
			array.sort(fn)
			var max = array[array.length - 1]
			if (min != null && fn(max, min) < 0) return
			return max
		}
		var max = array[0]
		  , maxv = fn(max)
	
		for (var i = 0; i < len; i++) {
			var v = fn(array[i])
			if (v > maxv) {
				maxv = v
				max = array[i]
			}
		}
		if (min != null && maxv < min) return
		return max
	} 
	var max = array[0]
	
	for (var i = 0; i < len; i++) {
		if (array[i] > max) max = array[i]
	}
	if (min != null && max < min) return
	return max
}

module.exports = winner