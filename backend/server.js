const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;
const eventScraper = require('./eventScraper');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up handlebars and view engine
app.set('views', path.join(__dirname, '../views'));
app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'main',
    })
);
app.set('view engine', 'handlebars');

// serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/css')));
app.use(express.static(path.join(__dirname, '../public/js')));
app.use(express.static(path.join(__dirname, '../public/assets/img')));

// get routes
app.get('/', async (req, res) => {
    // add resident advisor events
    // const eventURL = https://www.residentadvisor.net/events/nl/amsterdam;
    // other URLS
    // https://www.eventbrite.co.uk/d/online/%23techno/     searches #techno (no location)
    const eventURL = 'https://www.eventbrite.com/d/netherlands--amsterdam/techno-music/';
    const eventData = await eventScraper.scrapeEvents(eventURL);

    res.render('home', {
       technoEvents: eventData
    });
});

// post routes


// set up port
app.listen(port, () => {
    console.log('server is listening on port ', port);
});