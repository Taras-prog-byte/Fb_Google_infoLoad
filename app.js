const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI)
    .then(()=>console.log('mongoDB connected.'))
    .catch(error=>console.log(error))

app.use(passport.initialize());
require('./midlleware/passport')(passport);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use (require('morgan')('dev'));

app.use('/api/auth', authRoutes);

app.use (require('cors')());



module.exports = app;