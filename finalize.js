/* eslint-disable */

const glob = require('glob');
const { minify } = require('terser');
const { readFile, writeFile } = require('fs/promises');
const { relative, resolve } = require('path');
const { default: rimraf } = require('rimraf');

console.log('Compress and clean everything');

const baseSrcPath = `${__dirname}/.build`;
const baseDistPath = `${__dirname}/dist`;
glob(`${baseSrcPath}/**/*.js`)
  .then((sources) =>
    Promise.all(
      sources.map((source) =>
        readFile(source, {
          encoding: 'utf-8',
        })
          .then((content) => minify(content, {
            compress: {},
            mangle: {}
          }))
          .then(({ code }) =>
            writeFile(
              resolve(baseDistPath, relative(baseSrcPath, source)),
              `${code}\n`
            )
          )
      )
    )
  )
  .then(() => rimraf(baseSrcPath))
  .then(() => {
    console.log('Compressed everything');
  });
