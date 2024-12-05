
const mul = (n1, n2) => n1 * n2;

const getValidMulCalls = (corruptedSequence) => {
  const mulRegex = "mul\\([0-9]+,[0-9]+\\)";
  return corruptedSequence.match(new RegExp(mulRegex, "g"));
};

const computeResult = (mulSequenceArray) => {
  if (!mulSequenceArray) {
    return 0;
  }
  return mulSequenceArray.reduce((acc, mulInstruction) => {
    const numbersToMultiply = mulInstruction.match(new RegExp("[0-9]+", "g"));
    return acc + mul(numbersToMultiply[0], numbersToMultiply[1]);
  }, 0);
};

module.exports = {
   getValidMulCalls,
   computeResult,
};