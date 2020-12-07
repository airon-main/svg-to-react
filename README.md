# SVG to React

> Convert multiple SVG files into React (.js) files. Place your SVGs in the root-level `svg/` directory, and run one of the scripts listed below to process your batch.
<br>

## 📜 Scripts

The single file script will create a single `./output/single/icons.js` file with each SVG available as an export.
The multiple file script will create individual files/components for each SVG in an `./output/single/<filename>` file. The multiple file script will also convert filenames which use dashes to PascalCase.

**Single file:**
```bash
yarn run start:single
```

**multiple files:**
```bash
yarn run start:multiple
```
<br>

## License
MIT © [SVG to React](https://github.com/iPzard/svg-to-react)