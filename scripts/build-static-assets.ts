import fs from 'fs-extra';


const copyContentToTS = (filePathSrc, fileNameDst) => {
    const fileContent = fs.readFileSync(filePathSrc);

    const cssAsTS = `export const ${fileNameDst.toUpperCase().replace(/\./g, '_')} = \`
    ${fileContent.toString('base64')}
\`;`;

    fs.writeFileSync(`./src/viewer/web/generated/${fileNameDst}.ts`, cssAsTS);

}

fs.mkdirsSync('./src/viewer/web/generated');
copyContentToTS('./assets/styles.css', 'styles');
copyContentToTS('./node_modules/bootstrap/dist/css/bootstrap.min.css', 'bootstrap.min.css');
copyContentToTS('./node_modules/bootstrap/dist/css/bootstrap.min.css.map', 'bootstrap.min.css.map');
copyContentToTS('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'bootstrap.bundle.min');
copyContentToTS('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map', 'bootstrap.bundle.min.map');
