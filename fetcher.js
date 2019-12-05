const request = require('request');
const fs = require('fs');

const URL = process.argv[2];
const fileName = process.argv[3];

request(URL, (error, response, body) => {
  if (response) {
    fs.writeFile(fileName, body, function(err) {
      fs.stat(fileName, function(err, stats) {
        if (stats.isFile() === false) {
          console.log(`File path is invalid`);
          process.exit;
        }
        console.log(`Downloaded and saved ${stats['size']} bytes to ${fileName}`);
      });
    });
  } else {
    console.log('Invalid URL request.');
    process.exit;
  }
});

// Expected Output:
// > node fetcher.js http://www.example.com/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html