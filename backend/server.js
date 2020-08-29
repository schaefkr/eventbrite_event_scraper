const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up handlebars and view engine
app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'home'
    })
);
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/css')));
app.use(express.static(path.join(__dirname, '../public/js')));
app.use(express.static(path.join(__dirname, '../public/assets/img')));


app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log('server is listening on port ', port);
});