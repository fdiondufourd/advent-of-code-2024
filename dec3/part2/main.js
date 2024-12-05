const reader = require('../../utils/inputReader');
const input = reader.getInputFromArgs(process.argv);

const mulFinder = require("./mulFinder");
//const test = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

const resp = mulFinder.computeResult(mulFinder.getValidInstructionsSequence(input));

console.log('Your answer is : ', resp);