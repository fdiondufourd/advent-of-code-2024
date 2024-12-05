const reader = require('../../utils/inputReader');
const input = reader.getInputFromArgs(process.argv);

const mulFinder = require("./mulFinder");
const resp = mulFinder.computeResult(mulFinder.getValidMulCalls(input));

console.log('Your answer is : ', resp);