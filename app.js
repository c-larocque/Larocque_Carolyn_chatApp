const express = require('express'); // just like an include or require with PHP
const app = express(); // create an instance of our application via simpleExpress
const logger = require('./myModule');

const PORT = process.env.port;

let something = "somethingElse";

app.get('/', (req, res) => {
  logger.logIt(process.env.dbuser)
  res.sendFile(__dirname + '/index.html')
});

app.get('/contact', (req, res) => {
  logger.logIt('hit contact route')
  res.sendFile(__dirname + '/contact.html')
});

app.get('/users', (req, res) => {
  res.sendFile(__dirname + '/users.html')
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
