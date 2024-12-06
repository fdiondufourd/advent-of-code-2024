class PatternFinder {
  patterns;
  matrix;

  constructor(patterns) {
    this.patterns = patterns.map(pattern => this.getLettersMatrix(pattern));
  }

  setInput = (input) => {
    this.matrix = this.getLettersMatrix(input);
    return this;
  };

  getLettersMatrix = (input) => {
    return input.split(new RegExp("[\r\n]", "g")).map((line) => line.split(""));
  };

  scan = () => {
    let count = 0;
    this.patterns.forEach(pattern => {
      count = count + this.countOccurences(pattern);
    })
    return count;
  };

  countOccurences = (pattern) => {
    let count = 0;
    this.matrix.forEach((line, y) => {
      line.forEach((char, x) => {
        const isStart = pattern[0][0] === char;
        if (isStart) {
          const croppedMatrix = this.crop({ y, x }, pattern);

          if (this.eq(croppedMatrix, pattern)) {
            count++;
          }
        }
      });
    });

    return count;
  }

  crop = (startPos, pattern) => {
    const croppedMatrix = [];
    pattern.forEach((line, y) => {
      line.forEach((char, x) => {
        const inputChar = this.matrix[startPos.y + y]?.[startPos.x + x] ?? '';
        if (!croppedMatrix[y]) {
          croppedMatrix[y] = [];
        }
        croppedMatrix[y][x] = char === '.' ? '.' : inputChar;
      });
    });

    return croppedMatrix;
  };

  eq = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  }
}

module.exports = PatternFinder;
