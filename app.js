require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3001;
const environment = process.env.NODE_ENV || 'development';

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

//Static file declaration
app.use(express.static(path.join(__dirname, '/iss-app/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/iss-app/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = '/iss-app/build/index.html'));
  })
}
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/iss-app/public/index.html'));
})

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})