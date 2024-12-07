const { getMatrix } = require("../../utils/array.js");

const pathFinder = (input) => {
  // important : these need to be ordered from one direction to the next one (turning right)
  const guardDirections = ["<", "^", ">", "v"];
  const obstructionChar = "#";

  const findGuard = (roomMatrix) => {
    let guard = null;
    roomMatrix.forEach((line, y) => {
      line.forEach((char, x) => {
        if (guardDirections.includes(char)) {
          guard = { position: { y, x }, direction: char };
        }
      });
    });

    return guard;
  };

  const roomMatrix = getMatrix(input);
  const guard = findGuard(roomMatrix);
  const visitedPositions = [];

  const countSteps = (roomMatrix) => {
    let keepMoving = true;
    let stepCounter = 1;
    let currentPos = guard.position;
    let currentDirection = guard.direction;
    while (keepMoving) {
      const next = computeNextPosition(
        roomMatrix,
        currentPos,
        currentDirection
      );
      if (!next) {
        keepMoving = false;
      } else {
        currentPos = next.position ?? currentPos;
        currentDirection = next.direction;
        if (next.position) {
          const positionId = getPositionId(next.position);
          if (!visitedPositions.includes(positionId)) {
            stepCounter++;
          }
          visitedPositions.push(positionId);
        }
      }
    }
    return stepCounter;
  };

  const getPositionId = (position) => position.y + "|" + position.x;

  const computeNextPosition = (roomMatrix, currentPos, currentDirection) => {
    let foundNext = false;
    let toward = currentDirection;
    let attempt = currentPos;
    while (!foundNext) {
      attempt = getNextPosition(attempt, toward);
      const char = roomMatrix[attempt.y]?.[attempt.x];

      const outOfTheRoom = !char;
      if (outOfTheRoom) {
        return null;
      }

      const hasObstruction = obstructionChar === char;
      if (!hasObstruction) {
        foundNext = true;
      } else {
        toward = getNextDirection(toward);
        return { direction: toward };
      }
    }
    return { position: attempt, direction: toward };
  };

  const getNextDirection = (direction) => {
    const index = guardDirections.indexOf(direction);
    const nextIndex = (index + 1) % guardDirections.length;
    return guardDirections[nextIndex];
  };

  const getNextPosition = (position, direction) => {
    switch (direction) {
      case "^":
        return { y: position.y - 1, x: position.x };
      case "v":
        return { y: position.y + 1, x: position.x };
      case "<":
        return { y: position.y, x: position.x - 1 };
      case ">":
        return { y: position.y, x: position.x + 1 };
    }
  };

  return countSteps(roomMatrix);
};

module.exports = {
  pathFinder,
};
