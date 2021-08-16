const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

//Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;



// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(methodOverride('_method'));

// body parser
//app.use(express.urlencoded({ extended: false }));

//Express Session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/customer', require('./routes/customer'));

const PORT = process.env.PORT || 8000;


app.listen(PORT, console.log(`Server running on  ${PORT}`));