const path = require('path');
const fs = require('fs');
const expect = require('chai').expect;
const uglify = require('uglify-js');

const isUglified = require('../index');
const isCodeUglified = require('../index').isCodeUglified;

describe('is-uglified', () => {
  it('react.development.js should NOT be uglified', () => {
    const result = isUglified(path.join(__dirname, '../example/react.development.js'));
    expect(result).to.be.false;
  });

  it('react.production.js should be uglified', () => {
    const result = isUglified(path.join(__dirname, '../example/react.production.js'));
    expect(result).to.be.true;
  });

  it('should be uglified after minified by uglify-js', () => {
    const source = fs.readFileSync(path.join(__dirname, '../example/react.development.js'), 'utf-8');
    const { code } = uglify.minify(source);
    const result = isCodeUglified(code);

    expect(result).to.be.true;
  });

  it('should NOT be uglified after minified by uglify-js with `mangle` disabled', () => {
    const source = fs.readFileSync(path.join(__dirname, '../example/react.development.js'), 'utf-8');
    const { code } = uglify.minify(source, {
      mangle: false,
    });
    const result = isCodeUglified(code);

    expect(result).to.be.false;
  });

});
