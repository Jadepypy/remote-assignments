const express = require('express');
const mysqlx = require('@mysql/xdevapi');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = {
    password: 'mysql123',
    user: 'root',
    host: 'localhost',
    port: 33060,
    schema: 'assignment'
};

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

app.post('/', (req, res) => {
  let user;
  let message = ''
   
  if (req.body.form === 'signup-form'){
    mysqlx.getSession(config)
    .then(session => {
        user = session.getSchema('assignment').getTable('user');
        return user.select()
                    .where('email = :email')
                    .bind('email', req.body.email)
                    .execute()
    })
    .then(result => {
      const sameEmail = result.fetchAll()
      if(sameEmail.length > 0){
        message = 'Email already registered.'
      }else {
        user.insert(['email', 'password'])
              .values(req.body.email, req.body.password)
              .execute();
        res.cookie('username', req.body.email);
        message = 'Sign up successfully!'
      }
    }).then(() => {
      if (message === 'Sign up successfully!'){        
        res.redirect('/member');
      } else{
        res.render('index', {message});
      }
    })
  }else{
    mysqlx.getSession(config)
    .then(session => {
        user = session.getSchema('assignment').getTable('user');
        return user.select()
                    .where('email = :email')
                    .bind('email', req.body.email)
                    .execute()
    })
    .then(result => {
      const userData = result.fetchAll();
      if (userData.length === 0){
        message = 'Email not registered.'
      }else if(req.body.password === userData[0][2]){
        res.cookie('username', req.body.email);
        message = 'Log in successfully!'
      }else {
        message = 'Wrong passowrd.'
      }
    }).then(() => {
      if (message === 'Log in successfully!'){        
        res.redirect('/member');
      } else{
        res.render('index', {message});
      }
      
    })
  }
})

app.listen(3000);