const fs = require('fs');
const path = require('path');

const rootPath = fs.realpathSync(process.cwd());
const srcPath = path.resolve(rootPath, 'src');

function resolveFilePathRelativeToSrc(fileName) {
    return path.resolve(srcPath, fileName);
}

function resolveFilePathRelativeToRoot(fileName) {
    return path.resolve(rootPath, fileName);
}

module.exports = {
    resolveFilePathRelativeToSrc,
    resolveFilePathRelativeToRoot,
};