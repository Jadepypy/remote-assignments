const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  let { number } = req.query
  if (number){
    if (parseInt(number)){
      let sum = 0;
      for (let i = 1; i <= parseInt(number); i++){
        sum += i
      }
      res.send(sum.toString())
      
    } else{
      res.send('Wrong Parameter');
    }
  } else{
    res.send(number);
  }
})


module.exports = router;