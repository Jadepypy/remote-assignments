const express = require('express');
const mysqlx = require('@mysql/xdevapi');
const bodyParser = require('body-parser');

const config = {
    password: 'mysql123',
    user: 'root',
    host: 'localhost',
    port: 33060,
    schema: 'assignment'
};

mysqlx.getSession(config)
    .then(session => {
        console.log(session.inspect()); 
    });

const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(3000);