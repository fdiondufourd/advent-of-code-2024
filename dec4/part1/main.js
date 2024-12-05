const test = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const test2 = `..X...
.SAMX.
.A..A.
XMAS.S
.X....`;

const reader = require('../../utils/inputReader');
const input = reader.getInputFromArgs(process.argv);

const WordFinder = require("./WordFinder");
const resp = (new WordFinder('XMAS')).setInput(input).scan();
console.log('The answer is', resp);
