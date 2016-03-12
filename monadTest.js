import { composeM, Writer } from './F'

const _add = a => b => {
  const msg = a + " + " + b + " = " + (a + b)
  return [a + b, msg]
}
const computation = composeM (Writer.bind)([
  _add(4),
  _add(3),
  _add(2),
  _add(1),
])
console.log(computation(Writer.pure(42)))
