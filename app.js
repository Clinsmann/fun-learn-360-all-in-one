const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/User');

const app = express();
const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
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
app.use('/user', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`application started on port ${port}...`));
