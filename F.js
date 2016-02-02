/***************************************************************************************
** Author: Guillaume ARM ***************************************************************
** F.js; is little library utilites made for doing functional coding style with JS. ****
***************************************************************************************/

export const foldl = f => acc => xs => xs.reduce(f, acc)
export const foldr = f => acc => xs => xs.reverse().reduce(f, acc)
export const compose = f => g => x => f(g(x))

export default {compose, foldl, foldr}

