"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

var compose = exports.compose = function compose(f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
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

// f :: (acc, x, i, arr) => acc
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
var incr = exports.incr = function incr(x) {
	return ++x;
};
var decr = exports.decr = function decr(x) {
	return --x;
};

var exported_funcs = {
	__: __,
	curry: curry, apply: apply, compose: compose, flip: flip,
	inject: inject,
	foldl: foldl, foldr: foldr,
	incr: incr, decr: decr
};

// Use globally (do not use in production)
var UseFjsGlobally = exports.UseFjsGlobally = function UseFjsGlobally() {
	Object.assign(global, exported_funcs);
};

// Or with a normal ES6 scope
exports.default = exported_funcs;

