const mulFinder = require("./mulFinder");

const corruptedSequenceTests = [
  {
    sequence:
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
    expectedResult: 161,
  },
  {
    sequence:
      "xmul(2,WHAT4)%&mul[3,7]!@^do_not_mul(5mul(5,5),5)+mul(32,64]then(mul(11,8)mul(8,5))",
    expectedResult: 153,
  },
  {
    sequence: "mul(2,4)",
    expectedResult: 8,
  },
  {
    sequence: "nothing",
    expectedResult: 0,
  },
  {
   sequence: "mul(2,4)*mull(2000, 4)++mul(2,4)",
   expectedResult: 16,
 },
];

let allTestsPassed = true;
corruptedSequenceTests.forEach((test) => {
  const resp = mulFinder.computeResult(mulFinder.getValidMulCalls(test.sequence));
  allTestsPassed = allTestsPassed && resp === test.expectedResult;
});

console.log(allTestsPassed ? "All tests passed" : "Some tests failed");
