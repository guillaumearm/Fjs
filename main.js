/**************************************************************************************
** Author: Guillaume ARM **************************************************************
** main.js: Some Fjs tests ************************************************************
**************************************************************************************/
import F, {compose, foldl, foldr} from './F'

const rev = ([...xs]) => {
	return foldl 
		((acc,x) => [x, ...acc]) 
		('') 
		(xs);
}

//TODO: curry/uncurry + apply



const toString = t => t.join("")
let str = "Hello World"

// This reads from right to left
console.log ( compose (toString) (rev) ("Hello World") )

