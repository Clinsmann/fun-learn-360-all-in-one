// const dotenv = require('dotenv');
const express = require('express');
const userRouter = require('./routes/User');
const cookieParser = require('cookie-parser');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// dotenv.config();
const app = express();
const port = process.env.PORT;

require('./database/mongoose');

app.use(cookieParser());
app.use(express.json());
app.use('/user', userRouter);


app.listen(port, () => console.log(`application started on port ${port}...`));
