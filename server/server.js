const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/hs');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully.");
});

const managerRouter = require('./routes/manager');
const roleRouter = require('./routes/role');

app.use('/managers', managerRouter);
app.use('/roles', roleRouter);

app.get('/', (req, res) => {
  res.send('It\'s working!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})