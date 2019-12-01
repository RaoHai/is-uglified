const fs = require('fs');
const { parse } = require('acorn');
const walk = require('acorn-walk');
const { mean } = require('simple-statistics');

function isCodeUglified(code, threshold = 3) {
  try {
    const ast = parse(code);
    const identifies = [];

    walk.ancestor(ast, {
      Identifier(node) {
        identifies.push(node && node.name && `${node.name}`.length);
      }
    });

    return mean(identifies) < threshold;

  } catch (e) {
    throw new Error(e);
  }
}

function isFileUglified(filename, encode = 'utf-8', threshold = 3) {
  if (!fs.existsSync(filename)) {
    throw new Error(`Invalid file: ${filename}`);
  }

  const file = fs.readFileSync(filename, encode);
  return isCodeUglified(file, threshold);

}

isFileUglified.isCodeUglified = isCodeUglified;

module.exports = isFileUglified;
