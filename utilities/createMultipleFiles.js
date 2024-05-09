const fs = require('fs');

const createMultipleFiles = (names, input, parameters) => {
  names.forEach(name => {
    const svg = fs.readFileSync(`${input}/${name.originalFileName}`, { encoding: 'utf8' })
      .replace(/(?!\w):\w/g, (attribute) => attribute.replace(':', '').toUpperCase());
      
    // Template for component
    let component = `import React from 'react';`+'\n\n'+
    `export const ${name.componentName}Icon = () => {`+'\n'+
    `  return (`+'\n'+
    `    ${svg}`+'\n'+
    `  );`+'\n'+
    `};`;

    parameters.forEach((param) => {
      if (param == "fill") {
        component = component.replace(/ fill="([^"]*)"/gi," fill={fill}");
      } else if (param == "size") {
        component = component.replace(/ width="([^"]*)"/gi," width={size}");
        component = component.replace(/ height="([^"]*)"/gi," height={size}");
      } else if (param == "stroke") {
        component = component.replace(/ stroke="([^"]*)"/gi," stroke={stroke}");
      }
    });
    component = component.replace(" () ",` ({${parameters.join(", ")}}) `);

    if(name.originalFileName.includes('.svg')) {
      // If output directory doesn't exist, create one
      if (!fs.existsSync('./output')) fs.mkdirSync('./output');
      if (!fs.existsSync('./output/multiple')) fs.mkdirSync('./output/multiple');
      
      // Write component to output directory
      fs.writeFileSync(`./output/multiple/${name.newFileName}`.replace(/\.js$/, 'Icon.js'), component);
    }
    
  });
};

module.exports = { createMultipleFiles };