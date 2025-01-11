const http = require('http');
const fs = require('fs');
const path = require('path');

function startServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile(path.join(__dirname, 'countries.json'), 'utf-8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Error reading data' }));
        return;
      }
      const countries = JSON.parse(data);
      const countryName = req.url.replace('/', '').toLowerCase();
      if (!countryName) {
        res.statusCode = 200;
        res.end(JSON.stringify(countries));
      } else {
        const countryData = countries.filter(country => country.country.toLowerCase() === countryName);
        if (countryData.length > 0) {
          res.statusCode = 200;
          res.end(JSON.stringify(countryData));
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ message: 'no such country in the list' }));
        }
      }
    });
  });
  return server;
}
module.exports = { startServer };