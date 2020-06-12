const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DATABASE_URL,
  {useNewUrlParser: true, useUnifiedTopology: true},
  () => console.log('application successfully connected to database...'));
