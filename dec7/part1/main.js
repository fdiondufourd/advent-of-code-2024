const test = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const test2 = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
108: 4 5 3 9
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
108: 2 2 5 12`;

const parseInput = (input) => {
  const lines = input.split(new RegExp("[\r\n]", "g"));
  return lines.map((line) => {
    const split = line.split(": ");
    return {
      result: split[0],
      sequence: split[1].split(" "),
    };
  });
};

const reader = require('../../utils/inputReader');
const input = reader.getInputFromArgs(process.argv);

const parsed = parseInput(input);

const permutationsMap = new Map();

const computeResult = (operator, n1, n2) => {
  switch (operator) {
    case "*":
      return n1 * n2;
    case "+":
      return n1 + n2;
}
  throw new Error("Unknown operator");
};

const nbPermutations = (nbOperators, depth) => {
    return Math.pow(nbOperators, depth);
}

const randomPermutation = (operators, depth) => {
  let permutation = [];
  for (let i = 0; i < depth; i++) {
    randomIndex = Math.floor(Math.random() * 10) % operators.length;
    permutation.push(operators[randomIndex]);
  }
  return permutation.join("");
};

// too lazy to actually do the permutations myself...this a awful and ineffective!
const createPermutations = (depth) => {
  const operators = ["*", "+"];
  const permutations = [];
  let random;
  while (permutations.length != nbPermutations(operators.length, depth)) {
    found = false;
    while (!found) {
      random = randomPermutation(operators, depth);
      found = true;
      if (!permutations.includes(random)) {
        permutations.push(random);
        found = true;
      }
    }
  }
  return permutations;
};

const possibleComputations = [];
parsed.forEach((computation) => {
    const cached = permutationsMap.get(computation.sequence.length - 1);

    const permutations = cached ? cached : createPermutations(
        computation.sequence.length - 1
    );

    permutationsMap.set(computation.sequence.length - 1, permutations);

    if (permutations[0].length !== (computation.sequence.length -1)){
        throw new Error('pour!');
    }

    let sequenceIsPossible = false;
    for (let i = 0; i< permutations.length;i++) {
        if (!sequenceIsPossible) {
            const permutation = permutations[i];
            let totalSoFar = parseInt(computation.sequence[0], 10);
            let found = false;
            let count = 1;
            permutation.split("").forEach((operator, index) => {
                const n1 = totalSoFar;
                const n2 = parseInt(computation.sequence[index+1]);

                if (! n2) {
                    return;
                }
                const result = computeResult(operator, n1, n2);
                totalSoFar = result;

                if (count === (computation.sequence.length - 1) && result === parseInt(computation.result, 10)) {
                    found = true;
                    return;
                }
                count++;
            });
            if (found) {
                sequenceIsPossible = true;
                possibleComputations.push(computation);
            }
        }
    };
});

const keys = {};
const sum = possibleComputations.reduce((acc, item) => {
    if (keys[JSON.stringify(item)]) {
        return acc;
    }
    keys[JSON.stringify(item)] = true;
    return acc += parseInt(item.result, 10)
}, 0);
console.log(possibleComputations.length, parsed.length);
console.log('Your answer is', sum);