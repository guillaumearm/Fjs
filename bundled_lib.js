"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/***************************************************************************************
** Author: Guillaume ARM ***************************************************************
** F.js: is little library utilites made for doing functional coding style with JS. ****
***************************************************************************************/

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
		return !fs.length ? x : compose(fs)(fs.pop()(x));
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

var and = exports.and = function and(a) {
	return function (b) {
		return b && a;
	};
};
var or = exports.or = function or(a) {
	return function (b) {
		return b || a;
	};
};

var eq = exports.eq = function eq(a) {
	return function (b) {
		return b == a;
	};
};
var ne = exports.ne = function ne(a) {
	return function (b) {
		return b != a;
	};
};

var lt = exports.lt = function lt(a) {
	return function (b) {
		return b < a;
	};
};
var gt = exports.gt = function gt(a) {
	return function (b) {
		return b > a;
	};
};
var le = exports.le = function le(a) {
	return function (b) {
		return b <= a;
	};
};
var ge = exports.ge = function ge(a) {
	return function (b) {
		return b >= a;
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

var _asyncDo = exports._asyncDo = function _asyncDo(gen) {
	return new Async(function () {
		var done = arguments.length <= 0 || arguments[0] === undefined ? id : arguments[0];

		var step = function step(value) {
			var result = gen.next(value);
			if (result.done) return done(result.value);
			return result.value.bindM(step);
		};
		return step();
	});
};

// Maybe Monad

var Just = exports.Just = function () {
	function Just(a) {
		_classCallCheck(this, Just);

		this.return = a;
	}

	_createClass(Just, [{
		key: "bindM",
		value: function bindM(f) {
			return f(this.return);
		}
	}]);

	return Just;
}();

var Nothing = exports.Nothing = function () {
	function Nothing() {
		_classCallCheck(this, Nothing);

		this.return = null;
	}

	_createClass(Nothing, [{
		key: "bindM",
		value: function bindM() {
			return this;
		}
	}]);

	return Nothing;
}();

// Writer Monad

var Writer = exports.Writer = function () {
	function Writer(a) {
		var b = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

		_classCallCheck(this, Writer);

		this.return = [a, b];
	}

	_createClass(Writer, [{
		key: "bindM",
		value: function bindM(f) {
			var _return = _slicedToArray(this.return, 2);

			var a = _return[0];
			var b = _return[1];

			var _f$return = _slicedToArray(f(a).return, 2);

			var aa = _f$return[0];
			var bb = _f$return[1];

			this.return = [aa, b.concat(bb)];
			return this;
		}
	}]);

	return Writer;
}();

// Async parallel

var _parallelArray = function _parallelArray(m, fs) {
	var taskCounter = fs.length;
	var xs = [];

	return function (done) {
		fs.forEach(function (f, i) {
			var task = f && f.return;
			task(function (res) {
				xs[i] = res;
				if (! --taskCounter) done(xs);
			});
		});
	};
};
// Async Monad

var Async = exports.Async = function () {
	function Async() {
		var f = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

		_classCallCheck(this, Async);

		if (f && f.constructor && f.constructor.name === "Async") this.return = f.return;else if (Array.isArray(f)) this.return = _parallelArray(this, f);else this.return = f;
	}

	_createClass(Async, [{
		key: "bindM",
		value: function bindM(nextAsync) {
			var currentAsync = this.return;
			currentAsync(nextAsync);
			return this;
		}
	}]);

	return Async;
}();

