const fs = require('fs');

const createSingleFile = (names, input, parameters) => {

  const components = names.reduce((accumulator, name) => {
    let svg = fs.readFileSync(`${input}/${name.originalFileName}`, { encoding: 'utf8' })
      .replace(/(?!\w):\w/g, (attribute) => attribute.replace(':', '').toUpperCase());

    if(name.originalFileName.includes('.svg'))
      accumulator += '\n' +
      `export const ${name.componentName}Icon = () => {`+'\n'+
      ` return (`+'\n'+
      `    ${svg}`+'\n'+
      `  );`+'\n'+
      `};` + '\n';

    parameters.forEach((param) => {
      if (param == "fill") {
        accumulator = accumulator.replace(/ fill="([^"]*)"/gi," fill={fill}");
      } else if (param == "size") {
        accumulator = accumulator.replace(/ width="([^"]*)"/gi," width={size}");
        accumulator = accumulator.replace(/ height="([^"]*)"/gi," height={size}");
      } else if (param == "stroke") {
        accumulator = accumulator.replace(/ stroke="([^"]*)"/gi," stroke={stroke}");
      }
    });
    accumulator = accumulator.replace(" () ",` ({${parameters.join(", ")}}) `);

    return accumulator;
  }, "import React from 'react';\n");

  // If output directory doesn't exist, create one
  if (!fs.existsSync('./output')) fs.mkdirSync('./output');
  if (!fs.existsSync('./output/single')) fs.mkdirSync('./output/single');

  fs.writeFileSync(`./output/single/icons.js`, components);
};

module.exports = { createSingleFile };