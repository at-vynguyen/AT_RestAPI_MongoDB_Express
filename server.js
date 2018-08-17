const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url).then(() => {
  console.log("Sucsess connected database");
}).catch(err =>{
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

app.get('/', (req, res) => {
  res.json({"message": "Welcome to my app"});
});

require('./app/routes/note.routes.js')(app);

app.listen(3000, () => {
  console.log("Server is runing on port 3000");
})