const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const helmet = require('helmet');

const userRoutes = require('./src/Routes/user-routes');

app.use(helmet());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.listen(5000);