import { _do, print, Just, Nothing, Writer, id } from './F'

// import './basic_test'
// import './async_test'

console.log("-------- Begin continuations tests ---------")
/******************************************************************************/

const liftC = f => x => next => next (f (x))

const incr = x => x + 1
const double = x =>  x * 2

const doubleC = liftC (double)
const incrC = liftC (incr)
const one = liftC (id) (1)


console.log (one (incrC) (incrC) (incrC) (incrC) (incrC) (doubleC) (id))
