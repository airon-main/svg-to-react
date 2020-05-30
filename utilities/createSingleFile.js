const fs = require('fs');

const createSingleFile = (names, input) => {

  const components = names.reduce((accumulator, name) => {
    const svg = fs.readFileSync(`${input}/${name.originalFileName}`, { encoding: 'utf8' });

    return accumulator += '\n' +
    `export const ${name.componentName} = () => {`+'\n'+
    ` return (`+'\n'+
    `    ${svg}`+'\n'+
    `  );`+'\n'+
    `};` + '\n';
    
  }, "import React from 'react';\n");

  // If output directory doesn't exist, create one
  if (!fs.existsSync('./output')) fs.mkdirSync('./output');
  if (!fs.existsSync('./output/single')) fs.mkdirSync('./output/single');

  fs.writeFileSync(`./output/single/icons.js`, components);
};

module.exports = { createSingleFile };