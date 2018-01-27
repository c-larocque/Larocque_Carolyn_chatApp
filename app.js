const express = require('express'); // just like an include or require with PHP
const app = express(); // create an instance of our application via simpleExpress

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/contact.html')
});

app.get('/users', (req, res) => {
  res.sendFile(__dirname + '/users.html')
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
