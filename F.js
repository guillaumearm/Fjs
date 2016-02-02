/***************************************************************************************
** Author: Guillaume ARM ***************************************************************
** F.js; is little library utilites made for doing functional coding style with JS. ****
***************************************************************************************/

export const compose = f => g => x => f(g(x))

export default {compose}

