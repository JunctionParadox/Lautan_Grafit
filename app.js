const express = require('express');
var ejs = require('ejs');
var path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.resolve('./public')));

app.engine('html', ejs.renderFile);
app.set('view engine', ejs);
app.set('public', __dirname);

app.get('/', (req, res) => {
    res.render('public/index.html');
});

app.listen(port);