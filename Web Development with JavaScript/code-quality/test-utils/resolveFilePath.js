const fs = require('fs');
const path = require('path');

const rootPath = fs.realpathSync(process.cwd());
const srcPath = path.resolve(rootPath, 'src');

function resolveFilePath(fileName) {
    return path.resolve(srcPath, fileName);
}

module.exports = { resolveFilePath };