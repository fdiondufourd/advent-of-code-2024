const { getMatrix } = require('../../utils/array.js');
class WordFinder {
  word;
  matrix;

  constructor(word) {
    this.word = word;
  }

  setInput = (input) => {
    this.matrix = this.getLettersMatrix(input);
    return this;
  }

  getLettersMatrix = (input) => {
    return getMatrix(input);
  };

  scan = () => {
    const firstLetter = this.word[0];

    let count = 0;
    this.matrix.forEach((line, y) => {
      line.forEach((char, x) => {
        const isStart = firstLetter === char;
        if (isStart) {
          const occurences = this.countOccurences({ y, x });
          count = count + occurences;
        }
      });
    });

    return count;
  };

  countOccurences = (startPos) => {
    const directions = [
      { v: "up" },
      { v: "down" },
      { h: "left" },
      { h: "right" },
      { v: "up", h: "left" },
      { v: "up", h: "right" },
      { v: "down", h: "left" },
      { v: "down", h: "right" },
    ];

    let count = 0;
    directions.forEach((direction) => {
      const foundOne = this.hasWord(
        direction.v,
        direction.h,
        startPos
      );
      if (foundOne) {
        count++;
      }
    });

    return count;
  }; 

  hasWord = (
    verticalDirection,
    horizontalDirection,
    startPos
  ) => {
    if (
      !this.hasEnoughSpace(
        verticalDirection,
        horizontalDirection,
        startPos
      )
    ) {
      return false;
    }

    let found = true;
    let posY = startPos.y;
    let posX = startPos.x;

    this.word.split("").forEach((char) => {
      if (!found) {
        return;
      }

      found = char === this.matrix[posY][posX];
      posY = verticalDirection ? this.moveYCursor(verticalDirection, posY) : posY;
      posX = horizontalDirection
        ? this.moveXCursor(horizontalDirection, posX)
        : posX;
    });

    return found;
  };

  moveXCursor = (direction, posX) => {
    return direction === "left" ? posX - 1 : posX + 1;
  };

  moveYCursor = (direction, posY) => {
    return direction === "up" ? posY - 1 : posY + 1;
  };

  hasEnoughSpace = (
    verticalDirection,
    horizontalDirection,
    startPos
  ) => {
    if (!horizontalDirection) {
      return this.hasSpaceVertical(verticalDirection, startPos);
    }

    if (!verticalDirection) {
      return this.hasSpaceHorizontal(horizontalDirection, startPos);
    }

    return this.hasSpaceDiagonal(
      verticalDirection,
      horizontalDirection,
      startPos
    );
  };

  hasSpaceVertical = (direction, startPos) => {
    const neededSpace = this.word.length;
    const totalVerticalSpace = this.matrix.length;
    return direction === "up"
      ? startPos.y + 1 >= neededSpace
      : startPos.y <= totalVerticalSpace - neededSpace;
  };

  hasSpaceHorizontal = (direction, startPos) => {
    const neededSpace = this.word.length;
    const totalHorizontalSpace = this.matrix[0].length;
    return direction === "left"
      ? startPos.x + 1 >= neededSpace
      : startPos.x <= totalHorizontalSpace - neededSpace;
  };

  hasSpaceDiagonal = (
    verticalDirection,
    horizontalDirection,
    startPos
  ) => {
    return (
      this.hasSpaceVertical(verticalDirection, startPos) &&
      this.hasSpaceHorizontal(horizontalDirection, startPos)
    );
  };
}

module.exports = WordFinder
