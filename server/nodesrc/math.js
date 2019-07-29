function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  else {
    return fibonacci(n-1) + fibonacci(n-2);
  }
}

function fibonacciMap(n) {
  if (n <= 1) {
    return n;
  }

  let map = {
    0 : 0,
    1 : 1
  }

  for (let i = 2; i <= n; i++) {
    map[i] = map[i-1] + map[i-2];
  }

  return map[n];
}

function sqrt(x, g, closeto) {
  if (!closeto) {
    closeto = .001;
  }

  if (Math.abs(x/g - g) < closeto) {
    return g;
  } else {
    return sqrt(x, ((g + x/g) / 2), closeto);
  }
}

module.exports = {
  fibonacci : fibonacci,
  fibonacciMap : fibonacciMap,
  sqrt: sqrt
}
