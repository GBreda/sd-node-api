const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
require('dotenv').config()
const port = process.env.PORT || 3002;

app.use(cors());
app.use( (req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
      console.log("Connected to the database");
  })
  .catch(err => {
      console.log("Could not connect to the database");
      process.exit();
  });

app.get('/', (req, res) => {
    res.json({"message":"Welcome!"})
});

require('./app/routes/note.routes.js')(app);

app.listen(port, () => {
    console.log("Server is up");
});
