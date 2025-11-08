// infinite currying

function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  }
}

console.log(add(5)(2)(6)(7)(8)());

//  currying vs partial function
// currying -> no of args = no of functions returned internallu
// partial application

function sum(a) {
  return function (b, c) {
    return a + b + c;
  }
}
// partial fun -> function called inside another funtion with small arity

// real world application of currying
// Manipulating DOM

function updateElementtext(id) {
  return function (content) {
    document.querySelector('#' + id).textContent = content;
  }
}

const updateHeader = updateElementtext('heading');
updateHeader('cahanged heading')

// curry() implementation

// converts f(a,b,c) into f(a)(b)(c)

function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func(...args)
    }
    else {
      return function (...next) {
        return curriedFunc(...args, ...next)
      }
    }
  }
}
