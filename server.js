const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './views/layouts', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.use('/user/settings', function (req, res, next) {
  res.render('login');
  next()
}, function (req, res) {
  res.render('settings');
});

app.use('/user/panel', function (req, res, next) {
  res.render('login');
  next()
}, function (req, res) {
  res.render('panel');
});

app.use((req, res) => {
  res.status(404).send('<p>404 not found...</p>' +
      '<img src="error.png">');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});