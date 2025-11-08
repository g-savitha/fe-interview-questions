function createBase(num) {
  return (x) => {
    return x + num;
  }
}

var addSix = createBase(6);
addSix(10)
addSix(21)

// closure to create a private counter

function counter() {
  var _counter = 0;
  function setCounter(increment) {
    _counter += increment;
  }
  function getCounter() {
    return _counter;
  }

  return {
    setCounter,
    getCounter
  }
}

const c = counter();
c.setCounter(5);
c.setCounter(10);
c.getCounter();

// module pattern
var Module = (function () {
  function privateMethod() {
    // do something
    console.log("private");
  }
  return {
    publicMethod: function () {
      // can call privateMethod();
      console.log("public");
    }
  }
})();

Module.publicMethod();
Module.privateMethod();

// make this fn run only once

let view;
function likethevideo() {
  let called = 0;

  return function () {
    if (called > 0) {
      console.log('already subscribed');
    }
    else {
      view = 'savitha';
      console.log('subscribe to ', view)
      called++;
    }
  }
}
let isSubscribed = likethevideo()();
isSubscribed;
isSubscribed;
isSubscribed;
isSubscribed;
isSubscribed;

// more generic 

// once pollyfil
function once(func, context) {
  let ran;

  return function () {
    if (func) {
      ran = func.apply(context || this, arguments);
      func = null;
    }

    return ran;
  }
}

const hello = () => console.log("hello");

// memoize polyfill

function myMemoize(fn, context) {
  // cache for our fn
  const res = {};

  return function (...args) {
    var argsCache = JSON.stringify(args);

    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args)
    }
    return res[argsCache]
  }
}

const clumsyProduct = (num1, num2) => {
  for (let i = 1; i <= 1000000; i++) { }

  return num1 * num2;
}

const memoizedClumsyProduct = myMemoize(clumsyProduct)

console.time("first call");
console.log(memoizedClumsyProduct(94678, 7649));
console.timeEnd("first call");

console.time("second call");
console.log(memoizedClumsyProduct(94678, 7649));
console.timeEnd("second call");
