/**************************************************************************************
** Author: Guillaume ARM **************************************************************
** main.js: Some Fjs tests ************************************************************
**************************************************************************************/
import F, {compose} from './F'

const rev = ([...xs]) => {
	return F.foldl 
		((acc,x) => [x, ...acc]) 
		('') 
		(xs);
}

const toString = t => t.join("")
let str = "Hello World"

// Test compose and foldl
// This reads from right to left
console.log ( F.compose (toString) (rev) ("Hello World") )

// Test apply
const add = (a,b,c,d) => a+b+c+d

