cl=console.log
cl('hello')

const walk = require('walk');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);

const result = {};

const walker = walk.walk(directoryPath);

walker.on('file', function(root, fileStats, next) {
  const filePath = path.join(root, fileStats.name);

  if (path.extname(filePath) === '.template') {
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        console.log('Error reading file: ' + filePath);
      } else {
        const regex = /%%([^%]+)%%/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
          const key = match[1].trim();
          result[key] = '';
        }
      }
      next();
    });
  } else {
    next();
  }
});

walker.on('errors', function(root, nodeStatsArray, next) {
  console.log('Error occurred while walking directory.');
  next();
});

walker.on('end', function() {
  const resultFilePath = path.join(__dirname, 'result.json');
  const resultString = JSON.stringify(result, null, 2);
  fs.writeFile(resultFilePath, resultString, function(err) {
    if (err) {
      console.log('Error writing to file: ' + resultFilePath);
    } else {
      console.log('Result written to file: ' + resultFilePath);
    }
  });
  console.log('Done searching for template files.');
});

