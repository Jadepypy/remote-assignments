const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const checkValidity = require('./checkValidity');

const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.clearCookie('username');
  res.render('index');
})
app.get('/member', (req, res) => {
  res.render('member', {username: req.cookies.username});
})

app.post('/', async (req, res) => {
  //若為sign up，檢查是否email已註冊；若為log in，檢查密碼
  let message = await checkValidity(req.body.form, req.body.email, req.body.password);

  if (message === 'Sign up successfully!' || message === 'Log in successfully!'){   
    res.cookie('username', req.body.email);     
    res.redirect('/member');
  } else{
    res.render('index', {message});
  }
})

app.listen(3000);