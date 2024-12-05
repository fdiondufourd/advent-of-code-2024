var fs = require('fs');
const read = (file) => {
    return fs.readFileSync(file, 'utf8');
}

const getInputFromArgs = (args) => {
    const params = process.argv.slice(2);
    const file = params?.[0] ?? false;

    let filePath = file;
    if (!filePath) {
        filePath = 'input.txt';
    }

    const reader = require('../utils/inputReader');

    const input = reader.read(filePath);

    if (!input) {
        console.error('Could not find the input');
        return;
    }

    return input;
}

module.exports = {
    read,
    getInputFromArgs
};