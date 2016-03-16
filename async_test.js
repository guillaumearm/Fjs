import { _do, _doAsync, print, Writer, Just, Nothing, Async, id } from './F'

import './basic_test'
console.log("-------- Begin asynchronous tasks ---------")
/******************************************************************************/
const task = i => Async (done => {
  setTimeout(() => {
    console.log(i)
    done(i)
  }, 400)
})

const sleep1 = Async (done => {
  setTimeout(() => {done("OK")}, 1000)
})

const result1 = _doAsync(function*() {
  const a = yield task(1)
  const b = yield task(2)
  const c = yield task(3)
  return a + b + c
}())

const result2 = _doAsync(function*() {
  const [a,b,c] = yield Async ([task(4), task(5), task(6)])
  const d = yield _doAsync(function*(){
    const aa = yield task(11)
    const bb = yield task(22)
    const cc = yield Async(Async(task(33)))
    return aa + bb + cc
  }())
  return a + b + c + d
}())

const testParallel = Async([result1, result2])

const result3 = _doAsync(function*(){
  const [a, str] = yield testParallel
  const b = yield task(36)
  yield sleep1
  return [a + b, str]
}())

result2.unit(print)
/******************************************************************************/

/******************************************************************************/
console.log("--- ", _do(function*(){
  const a = yield Writer(40, ["First Message"])
  const b = yield Writer(1, ["Second Message"])
  const c = yield Writer(1, ["Third Message"])
  return a + b + c
}()).unit)
/******************************************************************************/


console.log("--- ", _do(function*(){
  const a = yield Just(10)
  const b = yield Just(20)
  const c = yield Just(30)
  const d = yield Just(40)
  return a + b + c + d
}()).unit)


console.log("--- ", _do(function*(){
  const a = yield Just(10)
  const b = yield Just(20)
  const c = yield Nothing()
  const d = yield Just(40)
  return a + b + c + d
}()).unit)

