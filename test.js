/**************************************************************************************
** Author: Guillaume ARM **************************************************************
** main.js: Some Fjs tests ************************************************************
**************************************************************************************/
import {
	_,
	curry, apply, compose, update,
	foldl, foldr,
	incr, decr
} from './F'

const rev = ([...xs]) => {
	return foldl 
		((acc,x) => [x, ...acc]) 
		('') 
		(xs);
}

const toString = t => t.join("")
let str = "Hello World"

// Test compose and foldl
// This reads from right to left
console.log ( compose (toString) (rev) ("Hello World") )

// Test apply
const add = (a,b,c,d) => a+b+c+d

