const express = require('express'); // just like an include or require with PHP
const app = express(); // create an instance of our application via simpleExpress
const logger = require('./utils/myModule');

// env vars
const PORT = process.env.port;

app.use(express.static('public'));

// import routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
