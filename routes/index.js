const express = require('express');
const router = express.Router();
const path = require('path');
const logger = require('../utils/myModule');

router.get('/', (req, res) => {
  logger.logIt(process.env.dbuser)
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

module.exports = router;
