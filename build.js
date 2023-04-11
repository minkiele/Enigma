const { glob } = require('glob');
const { minify } = require('terser');
const { writeFile } = require('fs/promises');
const { relative, resolve, dirname } = require('path');
const core = require('@babel/core');
const { mkdirp } = require('mkdirp');
const { rimraf } = require('rimraf');

const baseSrcPath = `${__dirname}/src`;
const baseDistPath = `${__dirname}/enigma`;

console.log("Building the Enigma machine");
// Delete the dist directory
rimraf(baseDistPath)
  .then(() =>
    // Find all the typescript files inside src directory
    glob(`${baseSrcPath}/**/*.ts`).then((sources) =>
      // For each source path
      Promise.all(
        sources.map((source) => {
          // Create the destination path
          const distPath = resolve(
            baseDistPath,
            relative(baseSrcPath, source)
          ).replace(/.ts$/, '.js');
          // Create a new directory up to the directory
          // containing the new translated file
          return mkdirp(dirname(distPath)).then(() =>
            core
              // Transform with babel every .ts file into .js
              .transformFileAsync(source)
              .then((content) =>
                // // Minify the generated code with terser
                minify(content.code, {
                  module: true,
                })
              )
              // Write the file into the filesystem
              .then(({ code }) => writeFile(distPath, `${code}\n`))
          );
        })
      )
    )
  )
  .then(
    () => {
      console.log('Everything went according to plan, you may now generate the type definitions.');
    },
    (err) => {
      console.log('Something went very wrong', err);
    }
  );
