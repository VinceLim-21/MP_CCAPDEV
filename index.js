const dotenv = require(`dotenv`);
const express = require(`express`)
const bodyParser = require(`body-parser`);
// import module `express-session`
const session = require('express-session');
// import module `mongoose`
const mongoose = require('mongoose');
// import module `connect-mongo`
const MongoStore = require('connect-mongo');
const db = require(`./models/db.js`);
const routes = require(`./routes/routes.js`);
const hbs = require(`hbs`);

const app = express();

dotenv.config();
//port = process.env.PORT || 3000;
//app.listen(process.env.PORT || 3000);

hostname = process.env.HOSTNAME;

app.set(`view engine`,`hbs`);
hbs.registerPartials(__dirname + `/views/partials`);

app.use(express.urlencoded({extended: true}));

app.use(express.static('assets'));

db.connect();

// use `express-session`` middleware and set its options
// use `MongoStore` as server-side session storage
/*app.use(session({
    'secret': 'ccapdev-session',
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));*/

app.use(session({
    secret: 'ccapdev-session',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: mongoose.connection._connectionString,
      mongoOptions: {}
    })
}));
app.use(`/`, routes);

// if the route is not defined in the server, render `../views/error.hbs`
// always define this as the last middleware
app.use(function (req, res) {

    var details = {};

    /*
        checks if a user is logged-in by checking the session data
        if a user is logged-in,
        display the profile tab and logout tab in the nav bar.
    */
    if(req.session.number) {
        details.flag = true;
        details.name = req.session.name;
        details.number = req.session.number;
    }

    /*
        if no user is logged-in,
        do not display the profile tab and the logout tab in the nav bar.
    */
    else
        details.flag = false;

    // render `../views/error.hbs`
    res.render('error', details);
});

app.listen(process.env.PORT || 3000);
/*app.listen(port,hostname,function(){
    console.log('Server running at:');
    console.log('http://'+ hostname + ':' + process.env.PORT || 3000);
});*/