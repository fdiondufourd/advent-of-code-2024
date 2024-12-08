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

  const initialRoomMatrix = getMatrix(input);
  const guard = findGuard(initialRoomMatrix);
  let visitedPositions = [];

  const countSteps = (roomMatrix) => {
    let keepMoving = true;
    let stepCounter = 1;
    let currentPos = guard.position;
    let currentDirection = guard.direction;
    let mightBeInALoop = 0;
    visitedPositions = [];
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
        const positionId = getPositionId({
          position: currentPos,
          direction: currentDirection,
        });
        // LOOP: we are in a loop when we visit two already visited positions back to back
        if (visitedPositions.includes(positionId)) {
          if (mightBeInALoop > 1) {
            throw new Error("Looping");
          }
          mightBeInALoop++;
        } else {
          mightBeInALoop = 0;
        }
        visitedPositions.push(positionId);
      }
    }
    return stepCounter;
  };

  const getPositionId = (next) =>
    next.position.y + "|" + next.position.x + "|" + next.direction;

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

  const findLoops = (roomMatrix) => {
    let counter = 0;
    for (let y = 0; y < roomMatrix.length; y++) {
      for (let x = 0; x < roomMatrix[0].length; x++) {
        const char = roomMatrix[y][x];
        if (char !== obstructionChar && !guardDirections.includes(char)) {
          if (hasLoop(roomMatrix, { y, x })) {
            counter++;
          }
        }
      }
    }
    return counter;
  };

  const hasLoop = (roomMatrix, obstructionPosition) => {
    const newRoomMatrix = JSON.parse(JSON.stringify(roomMatrix));
    if (!newRoomMatrix[obstructionPosition.y]) {
      newRoomMatrix[obstructionPosition.y] = [];
    }
    newRoomMatrix[obstructionPosition.y][obstructionPosition.x] = "#";
    console.log('Obstruction position', obstructionPosition);
    try {
      countSteps(newRoomMatrix);
    } catch(err) {
      return (err.message === 'Looping');
    }
    return false;
  };

  return findLoops(initialRoomMatrix);
};

module.exports = {
  pathFinder,
};
