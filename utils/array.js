const getMatrix = (input) => {
  return input.split(new RegExp("[\r\n]", "g")).map((line) => line.split(""));
};


module.exports = {
    getMatrix
}