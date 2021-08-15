const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser())
app.use(express.static('public'))

const mainRoutes = require('./routes');
const dataRoutes = require('./routes/data');

app.set('view engine', 'pug');

app.use(mainRoutes);
app.use('/data', dataRoutes);

app.listen(3000);
