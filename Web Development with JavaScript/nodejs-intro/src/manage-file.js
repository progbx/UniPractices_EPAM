const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const command = args[0];
const fileName = args[1];
let toFileName = args[3] || 'default.txt';

if (!['--copy', '--rename'].includes(command)) {
  throw new Error('Invalid command name! Please specify either copy or rename!');
}

if (fileName.startsWith('--') || toFileName.startsWith('--')) {
  throw new Error('Invalid arguments! The value should not start with --!');
}

const sourcePath = path.join(__dirname, fileName);
const destinationPath = path.join(__dirname, toFileName);

async function copyFile() {
  try {
    await fs.promises.copyFile(sourcePath, destinationPath);
    console.log(`File copied to ${toFileName}`);
  } catch (error) {
    console.error('Error copying file:', error);
  }
}

async function renameFile() {
  try {
    await fs.promises.rename(sourcePath, destinationPath);
    console.log(`File renamed to ${toFileName}`);
  } catch (error) {
    console.error('Error renaming file:', error);
  }
}

if (command === '--copy') {
  copyFile();
} else if (command === '--rename') {
  renameFile();
}