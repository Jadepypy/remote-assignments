const mysqlx = require('@mysql/xdevapi');
const config = {
    password: 'mysql123',
    user: 'root',
    host: 'localhost',
    port: 33060,
    schema: 'assignment'
};
let user;
mysqlx.getSession(config)
.then(async (session) => {
    user = await session.getSchema('assignment').getTable('user');
})


async function checkValidity(formName, email, password){
  if (formName === 'signup-form'){
    let message = await findEmailUser(email)
                  .then(async (userData) => {
                    if(userData.length > 0){
                      return 'Email already registered.'
                    }else {
                      await user.insert(['email', 'password'])
                                .values(email, password)
                                .execute();
                      return 'Sign up successfully!'
                    }
                  })
    return message;
  } else{
    let message = await findEmailUser(email)
                  .then(async (userData) => {
                    if (userData.length === 0){
                      return 'Email not registered.'
                    }else if(password === userData[0][2]){
                      return 'Log in successfully!'
                    }else {
                      return 'Wrong passowrd.'
                    }
                  })
    return message;
  }
}
async function findEmailUser (email){
  const data =  await user.select()
                      .where('email = :email')
                      .bind('email', email)
                      .execute()
  return data.fetchAll()
}

module.exports = checkValidity