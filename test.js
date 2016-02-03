/**************************************************************************************
** Author: Guillaume ARM **************************************************************
** main.js: Some Fjs tests ************************************************************
**************************************************************************************/
import F, {compose, foldl, foldr} from './bundled_lib'

const rev = ([...xs]) => {
	return foldl 
		((acc,x) => [x, ...acc]) 
		('') 
		(xs);
}

const toString = t => t.join("")
let str = "Hello World"

// This reads from right to left
console.log ( compose (toString) (rev) ("Hello World") )

