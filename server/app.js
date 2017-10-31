const express = require('express');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const path = require ('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');


const app = express();

app.use(cors());

require('dotenv').config();
app.use(cors())
app.use(logger('dev'));
app.use(express.static('../front/build')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(flash());
app.use(session({
  key: process.env.SECRET_KEY,
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});

/*  app.get('/', (req, res) => {
     res.send('hello world')
 }); */
 app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}));
const createRoutes = require('./routes/create-routes');
app.use('/create', createRoutes);
const viewRoutes = require('./routes/view-routes');
app.use('/site', viewRoutes);
const configRoutes = require('./routes/config-routes');
app.use('/config', configRoutes);


app.get('*', (req, res) => {
    res.send('404error');
  });


  /* 
  Addresses:

  Server side:
  /create/ - site creation
  /config/ - site editing
  /view/ - site preview

  client side:
  /setup/ - site creation
  /site/ - site preview
  /welcome/ - welcome pages
  
  
  */