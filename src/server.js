const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require('method-override');
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helpers = require('handlebars-helpers')();

const route = require('./routes'); 
const db = require('./config/db')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// method
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

//connect DB
db.connect();

// use middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// HTTP logger
app.use(morgan("combined"));

//use cookie parser
app.use(cookieParser());

// app.use(session()); // session middleware
// app.use(require('flash')());

// Teamplate engine
// app.engine(
//   "hbs",handlebars({
//     extname: ".hbs",
//     helpers: require("./ulti/helpers").helpers
//   })
// );

const hbs = handlebars.create({  
  helpers:require('./ulti/helpers'),
  extname: '.hbs'
})
app.engine('hbs', hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));


//Route innit
route(app);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
