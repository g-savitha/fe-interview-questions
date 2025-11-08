//  map , filter and reduce

const { useRef } = require("react");

const nums = [1, 2, 3, 4]

const numsMap = nums.map(num => num);
const moreThanTwo = nums.filter(num => num > 2);

const sum = nums.reduce((acc, curr, i, arr) => {
  return acc + curr;
}, 0)

// Array.map((num, i, arr)=>{})
// pollyfill

Array.prototype.myMap = function (cb) {
  let temp = [];

  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this));
  }

  return temp;
}

// filter (num, i, arr)

Array.prototype.myFilter = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) temp.push(this[i]);
  }
  return temp;
}


// reduce ((acc, curr, i, arr) =>{}, initialvalue)

Array.prototype.myReduce = function (cb, initValue) {
  var acc = initValue;

  for (let i = 0; i < this.length; i++) {
    acc = acc ? cb(acc, this[i], i, arr) : this[i];
  }
  return acc;
}

let students = [
  { name: 'a', roll: 21, marks: 80 },
  { name: 'b', roll: 15, marks: 69 },
  { name: 'c', roll: 26, marks: 35 },
  { name: 'd', roll: 7, marks: 55 },
]

const names = students.map(stu => {
  if (stu.marks < 60) stu.marks += 20;

  return stu
}).filter(stu => stu, marks > 60).reduce((acc, curr) => { acc + curr.marks }, 0)

// useEffect Polyfill
const useCustomEffect = (cb, deps) => {
  // first render
  // useRef value persists through out re-renders of component
  // value persists throigh out renders
  const isFirstRender = useRef(true);
  const prevDeps = useRef([]);
  if (isFirstRender.current) {
    isFirstRender.current = false;
    const cleanup = cb();
    return () => {
      if (cleanup & typeof cleanup === 'function') {
        cleanup();
      }
    };
  }
  // dep changes and no deps array
  const depsChanged = deps ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current) : true;

  if (depsChanged) {
    const cleanup = cb();
    return () => {
      if (cleanup & typeof cleanup === 'function' && deps) {
        cleanup();
      }
    };
  }

  // cleanup -> when deps array changes or component unmount

  prevDeps.current = deps || [];
}
