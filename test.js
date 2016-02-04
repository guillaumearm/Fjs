/**************************************************************************************
** Author: Guillaume ARM **************************************************************
** main.js: Some Fjs tests ************************************************************
**************************************************************************************/
import { __, apply, foldl, compose } from './F'

// Test compose and foldl
// This reads from right to left
const rev = ([...xs]) => {
	return foldl 
		((acc,x) => [x, ...acc]) 
		('') 
		(xs);
}
const toString = t => t.join("")
console.log ( compose (toString) (rev) ("Hello World") )

// Test apply
const f1 = (a,b,c,d) => a+b+c+d
const f2 = apply(f1, 1, __, 3, __)
console.log(f2(2,4))

