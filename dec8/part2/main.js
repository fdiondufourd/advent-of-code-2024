const { getMatrix } = require("../../utils/array");

const test = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const reader = require("../../utils/inputReader");
const input = reader.getInputFromArgs(process.argv);

const antennaMatrix = getMatrix(test);

const getKey = (coord) => {
  return coord.y + ":" + coord.x;
};

const getLength = (coord1, coord2) => {
  return Math.sqrt(
    Math.pow(coord2.y - coord1.y, 2) + Math.pow(coord2.x - coord1.x, 2)
  );
};

var getAngleRad = (coord1, coord2) =>
  Math.atan2(coord2.y - coord1.y, coord2.x - coord1.x);

const getLengthBetweenNodes = (antennaMatrix) => {
  const map = new Map();
  for (let i1 = 0; i1 < antennaMatrix.length; i1++) {
    for (let j1 = 0; j1 < antennaMatrix[i1].length; j1++) {
      for (let i2 = 0; i2 < antennaMatrix.length; i2++) {
        for (let j2 = 0; j2 < antennaMatrix[i2].length; j2++) {
          const coord1 = { y: i1, x: j1 };
          const coord2 = { y: i2, x: j2 };
          const key1 = getKey(coord1);
          const key2 = getKey(coord2);
          const length = getLength(coord1, coord2);
          const curr = map?.get(length) ?? new Map();
          curr.set(key1, [...(curr?.get(key1) ?? []), key2]);
          map.set(length, curr);
        }
      }
    }
  }
  return map;
};

const lengthBetweenNodes = getLengthBetweenNodes(antennaMatrix);

const findAntinodesForAntenna = (
  validAntinodes,
  antennaPosition,
  rad,
  length,
  increment,
  rotate180 = false
) => {
  const nodes = lengthBetweenNodes.get(length);

  if (!nodes) {
    return validAntinodes;
  }
  const possibleAntinodes1 = nodes.get(getKey(antennaPosition));

  if (!possibleAntinodes1) {
    return validAntinodes;
  }

  for (let z = 0; z < possibleAntinodes1.length; z++) {
    const key = possibleAntinodes1[z];
    const antinode = key.split(":");
    const r = rotate180
      ? getAngleRad({ y: antinode[0], x: antinode[1] }, antennaPosition)
      : getAngleRad(antennaPosition, { y: antinode[0], x: antinode[1] });
    if (r === rad) {
      validAntinodes.push(key);
    }
  }

  return findAntinodesForAntenna(
    validAntinodes,
    antennaPosition,
    rad,
    length + increment,
    increment,
    rotate180
  );
};

const findAntinodes = (antennaChar, antennaPosition) => {
  let validAntinodes = [];
  for (let i = antennaPosition.y; i < antennaMatrix.length; i++) {
    for (let j = 0; j < antennaMatrix.length; j++) {
      if (i === antennaPosition.y && j >= antennaPosition.x) {
        continue;
      }
      const isSameAntenna = antennaChar === antennaMatrix[i][j];
      if (isSameAntenna) {
        const length = getLength(antennaPosition, { y: i, x: j });
        const rad = getAngleRad(antennaPosition, { y: i, x: j });

        findAntinodesForAntenna(
          validAntinodes,
          antennaPosition,
          rad,
          length,
          length,
          false
        );
        console.log(validAntinodes);
        findAntinodesForAntenna(
          validAntinodes,
          antennaPosition,
          rad,
          length,
          length,
          true
        );

        console.log(validAntinodes);
      }
    }
  }

  return validAntinodes;
};

const foundAntinodes = {};
for (let i = 0; i < antennaMatrix.length; i++) {
  for (let j = 0; j < antennaMatrix[i].length; j++) {
    const current = antennaMatrix[i][j];
    const antennaRegex = new RegExp("[A-Za-z0-9]", "g");
    const isAntenna = antennaRegex.test(current);
    if (isAntenna) {
        console.log(current, { y: i, x: j });
      const antinodes = findAntinodes(current, { y: i, x: j });
      for (let z = 0; z < antinodes.length; z++) {
        foundAntinodes[antinodes[z]] = true;
      }
    }
  }
}

const answer = Object.keys(foundAntinodes).length;
console.log("Your answer is", answer);
