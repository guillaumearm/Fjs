import { _do, _asyncDo, print, compose, composeM, Writer, Just, Nothing, Async } from './F'

console.log("-------- Begin asynchronous tasks ---------")
/*******************************/


const task = i => new Async (done => {
  setTimeout(() => {
    console.log(i)
    done(i)
  }, 420)
})


const result1 = _asyncDo(function*() {
  const a = yield task(1)
  const b = yield task(2)
  const c = yield task(3)
  return a + b + c
}())

const result2 = _asyncDo(function*() {
  const a = yield task(4)
  const b = yield task(5)
  const c = yield task(6)
  return "YOLO"
}())

const testParallel = new Async([result1, result2])

const result3 = _asyncDo(function*(){
  const [a, str] = yield testParallel
  const b = yield task(36)
  return [a + b, str]
}())

result3.return(print)
