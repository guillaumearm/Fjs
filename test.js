/**************************************************************************************
** Author: Guillaume ARM **************************************************************
** main.js: Some Fjs tests ************************************************************
**************************************************************************************/
//import { __, inject, flip, apply, foldl, compose } from '.'

let lib = require('.')
for (let f in lib)
   global[f] = lib[f]

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

// Test appl, content:truey
const f1 = (a,b,c,d) => a+b+c+d
const f2 = apply(f1, 1, __, 3, __)
console.log(f2(2,4))

let initWithHello = flip (inject) ({id: 1, data: [], content: "Hello World"})
console.log([{id: 1, content:true}].map(initWithHello))
