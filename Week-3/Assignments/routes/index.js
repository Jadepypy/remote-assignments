const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, My Server!');
})

router.get('/myName', (req, res) => {
  res.render('myName', {name: req.cookies.username});
})

router.get('/trackName', (req, res) => {
  res.cookie('username', req.query.name);
  res.redirect('/myName');
})

module.exports = router;
