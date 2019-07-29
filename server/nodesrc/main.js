const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const addon = require('../build/Release/testaddon.node');
const config = require('./config/config');
const Math = require('./math');
const Measure = require('./measure');

const app = express()

app.use(morgan(':method(:url) || Status(:status) || Response_time(:response-time ms)'));
app.use(bodyParser.json())
app.use(cors())

app.get('/fibonacci', (req, res) => {
  console.log("Fibonacci measure execution time.");
  let n = req.query.n;
  if (!n || n < 1) {
    return res.status(400).send({
      message: 'Wrong value of n!'
    });
  }
  let result;
  if (req.query.map === 'true') {
    result = Measure.check(n, (i) => {return addon.Fibonacci(i, true)}, Math.fibonacciMap);
  } else {
    result = Measure.check(n, (i) => {return addon.Fibonacci(i, false)}, Math.fibonacci);
  }
  result.title = 'Speed result';
  return res.send(result);
})

app.get('/sqrt', (req, res) => {
  console.log("Sqrt measure execution time.");
  let n = req.query.n;
  if (!n || n < 1) {
    return res.status(400).send({
      message: 'Wrong value of n!'
    });
  }
  let result;
  if (req.query.closeto) {
    let closeto = parseFloat(req.query.closeto);
    result = Measure.check(n, (i) => {return addon.Sqrt(i, i/2, closeto)}, (i) => {return Math.sqrt(i, i/2, closeto)});
  } else {
    result = Measure.check(n, (i) => {return addon.Sqrt(i, i/2)}, (i) => {return Math.sqrt(i, i/2)});
  }
  result.title = 'Speed result';
  return res.send(result);
})


/*
const prevInstance = new addon.ClassExample(4.3);
console.log('Initial value : ', prevInstance.getValue());
console.log('After adding 3.3 : ', prevInstance.add(3.3));

const newFromExisting = new addon.ClassExample(prevInstance);

console.log('Testing class initial value for derived instance');
console.log(newFromExisting.getValue());
*/

app.listen(process.env.PORT || config.port,
  () => {
    console.log(`Addon mounted: \n`, addon);
    console.log(`Server works on port ${config.port} ...`);
  }
);
