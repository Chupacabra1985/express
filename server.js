const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.show('index.html');
});

app.get('/home', (req, res) => {
  res.show('index.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.use('/user/settings', function (req, res, next) {
  res.show('login.html');
  next()
}, function (req, res) {
  res.show('settings.html');
});

app.use('/user/panel', function (req, res, next) {
  res.show('login.html');
  next()
}, function (req, res) {
  res.show('panel.html');
});

app.use((req, res) => {
  res.status(404).send('<p>404 not found...</p>' +
      '<img src="error.png">');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});