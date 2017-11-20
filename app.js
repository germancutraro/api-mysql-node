const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
// own modules and vars
const PORT = process.env.PORT || 3000;
require('./libs/db-connection');
// conf
app.use(helmet()); // for security 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/axios/dist')));
app.set('view engine', 'ejs');

// main endpoint
app.get('/', (req, res) => {
  res.render('index');
});
// create middleware for our api route
app.use('/api', require('./routes/'));

// run server
app.listen(PORT, err => {
  if (err) throw err;
  console.log(`App running on port ${PORT}`);
});
