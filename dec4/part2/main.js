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

const test3 = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`

const patterns = [
`M.S
.A.
M.S`,
`S.S
.A.
M.M`,
`M.M
.A.
S.S`,
`S.M
.A.
S.M`,
];

const reader = require('../../utils/inputReader');
const input = reader.getInputFromArgs(process.argv);

const PatternFinder = require("./PatternFinder");
const resp = (new PatternFinder(patterns)).setInput(input).scan();
console.log('The answer is', resp);
