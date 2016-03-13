import { _do, _doAsync, print, Writer, Just, Nothing, Async } from './F'

import './basic_test'
console.log("-------- Begin asynchronous tasks ---------")
/*******************************/
const task = i => new Async (done => {
  setTimeout(() => {
    console.log(i)
    done(i)
  }, 420)
})

const sleep1 = new Async (done => {
  setTimeout(() => {done("OK")}, 1000)
})

const result1 = _doAsync(function*() {
  const a = yield task(1)
  const b = yield task(2)
  const c = yield task(3)
  return a + b + c
}())

const result2 = _doAsync(function*() {
  const a = yield task(4)
  const b = yield task(5)
  const c = yield task(6)
  return "YOLO"
}())

const testParallel = new Async([result1, result2])

const result3 = _doAsync(function*(){
  const [a, str] = yield testParallel
  const b = yield task(36)
  yield sleep1
  return [a + b, str]
}())
/***********/

result3.unit(print)

const res = _do(function*(){
  const a = yield Just(5)
  const b = yield Just(6)

  return Just(a + b)
}())

console.log(res.unit)
