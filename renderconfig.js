const fs = require('fs');
const path = require('path');
const walk = require('walk');

const directoryPath = path.join(__dirname);
const resultFilePath = path.join(directoryPath, 'render.config.json');

fs.readFile(resultFilePath, 'utf8', function(err, data) {
  if (err) {
    console.log('Error reading file: ' + resultFilePath);
  } else {
    const result = JSON.parse(data);
    const regex = /%%([^%]+)%%/g;

    const walker = walk.walk(directoryPath);

    walker.on('file', function(root, fileStats, next) {
      const filePath = path.join(root, fileStats.name);

      if (path.extname(filePath) === '.template') {
        fs.readFile(filePath, 'utf8', function(err, data) {
          if (err) {
            console.log('Error reading file: ' + filePath);
            next();
          } else {
            let modified = false;
            let match;
            while ((match = regex.exec(data)) !== null) {
              const key = match[1].trim();
              if (result[key] !== undefined) {
                data = data.replace(new RegExp(`%%${key}%%`, 'g'), result[key]);
                modified = true;
              }
            }
            if (modified) {
              const newFilePath = filePath.slice(0, -9);
              fs.writeFile(newFilePath, data, function(err) {
                if (err) {
                  console.log('Error writing file: ' + newFilePath);
                } else {
                  console.log('File written: ' + newFilePath);
                }
                next();
              });
            } else {
              next();
            }
          }
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
      console.log('Done rendering templates.');
    });
  }
});

