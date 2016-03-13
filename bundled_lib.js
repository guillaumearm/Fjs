"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /***************************************************************************************
                                                                                                                                                                                                                                                                  ** Author: Guillaume ARM ***************************************************************
                                                                                                                                                                                                                                                                  ** F.js: is little library utilites made for doing functional coding style with JS. ****
                                                                                                                                                                                                                                                                  ***************************************************************************************/

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Async = exports.Writer = exports.Just = exports.Nothing = exports._doAsync = exports._do = exports.composeM = exports.decr = exports.incr = exports._ge = exports._le = exports._gt = exports._lt = exports._ne = exports._eq = exports._or = exports._and = exports.ge_ = exports.le_ = exports.gt_ = exports.lt_ = exports.ne_ = exports.eq_ = exports.or_ = exports.and_ = exports.not = exports.id = exports.print = exports.foldr = exports.foldl = exports.any = exports.all = exports.filter = exports.map = exports.inject = exports.flip = exports.compose = exports.apply = exports.curry = exports.__ = undefined;

require("./test");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __ = exports.__ = undefined;

////////////////////////////////////////////////////////////////////////////////
/////////////////////// PRIVATE ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var isUndefined = function isUndefined(x) {
	return x === __;
};
var concatUndefined = function concatUndefined(xsa) {
	return function (xsb) {
		return xsa.map(function (x) {
			return !isUndefined(x) ? x : xsb.shift();
		}).concat(xsb);
	};
};

////////////////////////////////////////////////////////////////////////////////
/////////////////////// FUNCTIONAL STYLE BASICS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var curry = exports.curry = function curry(f) {
	for (var _len = arguments.length, xs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		xs[_key - 1] = arguments[_key];
	}

	return xs.length === f.length ? f.apply(undefined, xs) : curry.bind.apply(curry, [undefined, f].concat(xs));
};

var apply = exports.apply = function apply(f) {
	for (var _len2 = arguments.length, xs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		xs[_key2 - 1] = arguments[_key2];
	}

	return function () {
		for (var _len3 = arguments.length, otherXs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			otherXs[_key3] = arguments[_key3];
		}

		return f.apply(undefined, concatUndefined(xs)(otherXs));
	};
};

var compose = exports.compose = function compose(fs) {
	return function (x) {
		if (!fs.length) return x;
		var f = fs.pop();
		return compose(fs)(f(x));
	};
};

var flip = exports.flip = function flip(f) {
	return function (a) {
		return function (b) {
			return f(b, a);
		};
	};
};

// inject works with objects
var inject = exports.inject = curry(function (changes, obj) {
	return _extends({}, obj, changes);
});

// f :: (element, index, array) => array
var map = exports.map = function map(f) {
	return function (xs) {
		return xs.map(f, undefined);
	};
};
var filter = exports.filter = function filter(f) {
	return function (xs) {
		return xs.filter(f, undefined);
	};
};

// p :: (element, index, array) => array
// p is a predicat
var all = exports.all = function all(p) {
	return function (xs) {
		return xs.every(p, undefined);
	};
};
var any = exports.any = function any(p) {
	return function (xs) {
		return xs.some(p, undefined);
	};
};

// f :: (accumulator, element, index, array) => accumulator
var foldl = exports.foldl = function foldl(f) {
	return function (acc) {
		return function (xs) {
			return xs.reduce(f, acc);
		};
	};
};
var foldr = exports.foldr = function foldr(f) {
	return function (acc) {
		return function (xs) {
			return xs.reverse().reduce(f, acc);
		};
	};
};

////////////////////////////////////////////////////////////////////////////////
/////////////////////// USEFUL FOR COMPOSITION /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var print = exports.print = function print(x) {
	console.log(x);return x;
};
var id = exports.id = function id(x) {
	return x;
};
var not = exports.not = function not(x) {
	return !x;
};

var and_ = exports.and_ = function and_(b) {
	return function (a) {
		return a && b;
	};
};
var or_ = exports.or_ = function or_(b) {
	return function (a) {
		return a || b;
	};
};
var eq_ = exports.eq_ = function eq_(b) {
	return function (a) {
		return a == b;
	};
};
var ne_ = exports.ne_ = function ne_(b) {
	return function (a) {
		return a != b;
	};
};
var lt_ = exports.lt_ = function lt_(b) {
	return function (a) {
		return a < b;
	};
};
var gt_ = exports.gt_ = function gt_(b) {
	return function (a) {
		return a > b;
	};
};
var le_ = exports.le_ = function le_(b) {
	return function (a) {
		return a <= b;
	};
};
var ge_ = exports.ge_ = function ge_(b) {
	return function (a) {
		return a >= b;
	};
};

var _and = exports._and = function _and(a) {
	return function (b) {
		return a && b;
	};
};
var _or = exports._or = function _or(a) {
	return function (b) {
		return a || b;
	};
};
var _eq = exports._eq = function _eq(a) {
	return function (b) {
		return a == b;
	};
};
var _ne = exports._ne = function _ne(a) {
	return function (b) {
		return a != b;
	};
};
var _lt = exports._lt = function _lt(a) {
	return function (b) {
		return a < b;
	};
};
var _gt = exports._gt = function _gt(a) {
	return function (b) {
		return a > b;
	};
};
var _le = exports._le = function _le(a) {
	return function (b) {
		return a <= b;
	};
};
var _ge = exports._ge = function _ge(a) {
	return function (b) {
		return a >= b;
	};
};

var incr = exports.incr = function incr(x) {
	return ++x;
};
var decr = exports.decr = function decr(x) {
	return --x;
};

////////////////////////////////////////////////////////////////////////////////
/////////////////////// Monads /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Monadic composition
var composeM = exports.composeM = function composeM(fs) {
	return function (m) {
		if (!fs.length) return m;
		var f = fs.pop();
		return composeM(fs)(m.bindM(f));
	};
};

// Monadic do notation
var _do = exports._do = function _do(gen) {
	var step = function step(value) {
		var result = gen.next(value);
		if (result.done) return result.value;
		return result.value.bindM(step);
	};
	return step();
};

var _doAsync = exports._doAsync = function _doAsync(gen) {
	return new Async(function () {
		var done = arguments.length <= 0 || arguments[0] === undefined ? id : arguments[0];

		var step = function step(value) {
			var result = gen.next(value);
			if (result.done) {
				var ret = done(result.value);
				return typeof ret === "function" ? Async(ret) : ret;
			}
			return result.value.bindM(step);
		};
		return step();
	});
};

// Maybe Monad
var Nothing = exports.Nothing = function Nothing() {
	var unit = undefined;
	var bindM = function bindM() {
		return Nothing();
	};
	return { unit: unit, bindM: bindM };
};

var Just = exports.Just = function Just(a) {
	var unit = a;
	var bindM = function bindM(f) {
		var r = f(unit);
		return r && r.bindM ? r : Just(r);
	};
	return { unit: unit, bindM: bindM };
};

// Writer Monad

var Writer = exports.Writer = function Writer(a, b) {
	return new _Writer(a, b);
};

var _Writer = function () {
	function _Writer(a) {
		var b = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

		_classCallCheck(this, _Writer);

		this.unit = [a, b];
	}

	_createClass(_Writer, [{
		key: "bindM",
		value: function bindM(f) {
			var _unit = _slicedToArray(this.unit, 2);

			var a = _unit[0];
			var b = _unit[1];

			var r = f(a);

			var _ref = r && r.bindM ? r.unit : Writer(r).unit;

			var _ref2 = _slicedToArray(_ref, 2);

			var aa = _ref2[0];
			var bb = _ref2[1];

			this.unit = [aa, b.concat(bb)];
			return this;
		}
	}]);

	return _Writer;
}();

// Continuation Monad

// Async Monad

var Async = exports.Async = function Async(a) {
	return new _Async(a);
};

var _Async = function () {
	function _Async() {
		var a = arguments.length <= 0 || arguments[0] === undefined ? id : arguments[0];

		_classCallCheck(this, _Async);

		if (a && a.constructor && a.constructor.name === "_Async") this.unit = a.unit;else if (Array.isArray(a)) this.unit = _parallelArray(this, a);else this.unit = a;
	}

	_createClass(_Async, [{
		key: "bindM",
		value: function bindM(nextAsync) {
			var currentAsync = this.unit;
			currentAsync(nextAsync);
			return typeof nextAsync === 'function' ? Async(nextAsync) : Async(function () {
				return nextAsync;
			});
		}
	}]);

	return _Async;
}();

// Async parallel

var _parallelArray = function _parallelArray(m, fs) {
	var taskCounter = fs.length;
	var xs = [];

	return function (done) {
		fs.forEach(function (f, i) {
			var task = f && f.unit;
			task(function (res) {
				xs[i] = res;
				if (! --taskCounter) done(xs);
			});
		});
	};
};

