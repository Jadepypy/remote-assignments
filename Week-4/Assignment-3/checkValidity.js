const mysqlx = require('@mysql/xdevapi');
let user;

const config = {
    password: 'mysql123',
    user: 'root',
    host: 'localhost',
    port: 33060,
    schema: 'assignment'
};

function checkValidity(formName, email, password){
  if (formName=== 'signup-form'){
    mysqlx.getSession(config)
    .then(async (session) => {
        user = await session.getSchema('assignment').getTable('user');
        return await findData(email)
    })
    .then(result => {
      result = result.fetchall()
      if(result.length > 0){
        message = 'Email already registered.'
      }else {
        user.insert(['email', 'password'])
              .values(email, password)
              .execute();
        message = 'Sign up successfully!'
      }
      return message
    })
  }else{
    mysqlx.getSession(config)
    .then(async (session) => {
        user = await session.getSchema('assignment').getTable('user');
        return await findData(email)
    })
    .then(result => {
      const userData = result.fetchAll();
      console.log('?')
      console.log(userData)
      if (userData.length === 0){
        message = 'Email not registered.'
      }else if(password === userData[0][2]){
        message = 'Log in successfully!'
      }else {
        message = 'Wrong passowrd.'
      }
      return message
    })
  }
}
function findData (email){
  return  user.select()
              .where('email = :email')
              .bind('email', email)
              .execute()
}

module.exports = checkValidity