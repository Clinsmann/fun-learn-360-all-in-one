(process.env.NODE_ENV !== 'production') && require('dotenv').config();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/User');
const expressSession = require('express-session')({
  secret: process.env.JWT_SECRET,
  saveUninitialized: false,
  resave: false
});

const app = express();
const port = process.env.PORT || 5000;
if (process.env.REDISTOGO_URL) {
  const rtg = require("url").parse(process.env.REDISTOGO_URL);
  const redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]);
} else {
  // const redis = require("redis").createClient();
}

require('./database/mongoose');
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.use('/user', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`application started on port ${port}...`));
