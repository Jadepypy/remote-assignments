//資料庫連線設定
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

//若為sign up，檢查是否email已註冊；若為log in，檢查密碼
async function checkValidity(formName, email, password){
  //檢查是否email已註冊
  if (formName === 'signup-form'){
    let message = await findEmailUser(email)
                  .then(async (userData) => {
                    if(userData.length > 0){
                      //若email已有人註冊
                      return 'Email already registered.'
                    }else {
                      //將帳密輸入資料庫
                      await user.insert(['email', 'password'])
                                .values(email, password)
                                .execute();
                      return 'Sign up successfully!'
                    }
                  })
    return message;
  } else{ //檢查密碼是否正確
    let message = await findEmailUser(email)
                  .then((userData) => {
                    if (userData.length === 0){
                      //email未註冊過
                      return 'Email not registered.'
                    }else if(password === userData[0][2]){
                      //密碼正確成功登入
                      return 'Log in successfully!'
                    }else {
                      //密碼錯誤
                      return 'Wrong passowrd.'
                    }
                  })
    return message;
  }
}
//給定email，返回資料庫中此email用戶資料
async function findEmailUser (email){
  const data =  await user.select()
                      .where('email = :email')
                      .bind('email', email)
                      .execute()
  return data.fetchAll()
}

module.exports = checkValidity