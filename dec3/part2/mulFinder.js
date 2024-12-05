
const mul = (n1, n2) => n1 * n2;
const mulRegex = "mul\\([0-9]+,[0-9]+\\)";
const doRegex = 'do\\(\\)';
const dontRegex = "don\\'t\\(\\)";

const getValidInstructionsSequence = (corruptedSequence) => {
  const combined = `(${mulRegex}|${doRegex}|${dontRegex})`;
  return corruptedSequence.match(new RegExp(combined, "g"));
};

const isDo = (instruction) => (new RegExp(doRegex)).test(instruction);
const isDont = (instruction) => (new RegExp(dontRegex)).test(instruction);

const computeResult = (mulSequenceArray) => {
  if (!mulSequenceArray) {
    return 0;
  }
  let compute = true;
  return mulSequenceArray.reduce((acc, instruction) => {
    if (isDo(instruction)) {
      compute = true;
    } else if (isDont(instruction)) {
      compute = false;
    } else if (compute) {
      const numbersToMultiply = instruction.match(new RegExp("[0-9]+", "g"));
      acc = acc + mul(numbersToMultiply[0], numbersToMultiply[1]);
    }
    return acc;
  }, 0);
};

module.exports = {
  getValidInstructionsSequence,
   computeResult,
};