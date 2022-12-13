const express = require('express');
const app = express();
const helmet = require('helmet');

const userRoutes = require('./Routes/user-routes');

app.use(helmet());

app.use('/api/users', userRoutes);

app.listen(5000);