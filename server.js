const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Set up default mongoose connection and connect
const mongoDB = 'mongodb://server/db';

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

const rootRoutes = require('./api/routes/root.routes');
const exampleRoutes = require('./api/routes/example.routes');

app.get('/', rootRoutes);
app.use('/api', exampleRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));