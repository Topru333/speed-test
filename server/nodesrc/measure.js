const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e-6;
const MAX_ITERATIONS = 30;

function check(max, cppfun, jsfun) {
  let jsarray = [], cpparray = [];
  for (let i = 1; i <= max; i++) {
    let mid = 0;
    for (let j = 0; j < MAX_ITERATIONS; j++) {
      let time = process.hrtime();
      cppfun(i);
      let diff = process.hrtime(time);
      mid = mid + ((diff[0] * NS_PER_SEC + diff[1])  * MS_PER_NS);
    }
    mid = mid / MAX_ITERATIONS;
    cpparray.push(mid.toFixed(5));

    mid = 0;
    for (let j = 0; j < MAX_ITERATIONS; j++) {
      time = process.hrtime();
      jsfun(i);
      diff = process.hrtime(time);
      mid = mid + ((diff[0] * NS_PER_SEC + diff[1])  * MS_PER_NS);
    }
    mid = mid / MAX_ITERATIONS;
    jsarray.push(mid.toFixed(5));
    //process.stdout.write(`Current n: ${i} || cpp time: ${cpparray[i-1]} || js time: ${jsarray[i-1]}\r`);
  }
  return {jsresult: jsarray, cppresult: cpparray};
}

module.exports = {
  check : check
}
