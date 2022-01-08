var express = require('express');
var router = express.Router();
let loginBL = require('../bls/loginBL')
let moviesBL = require('../bls/moviesBL')
/* GET home page. */
router.get('/', function (req, res, next) {
  req.session["isLoggedIn"]=false
  if (req.session.username===undefined && req.session.isLoggedIn===false  ) res.render('login', {isAlert:false});
  else res.render('login', {isAlert:true});
});

router.post('/login', async function (req, res, next) {
  req.session["isLoggedIn"]=true

  let username = req.body.username
  let password = req.body.password
  let isAccessGranted = await loginBL.checkCreds(username, password)
  let user = await loginBL.getUser(username, password)
  if (isAccessGranted === true && user.TransactionsNum === "unlimited") {
    req.session["username"]=username
    req.session["auth"]=true
    res.redirect('/menu')
  }
  if (isAccessGranted === true && user.TransactionsNum > 0) {
    req.session["username"]=username
    res.redirect('/menu')
  } else {
    res.render('login', {isAlert:true});
  }
})
router.get('/menu', function (req, res, next) {
  if (req.session.auth) {
  res.render('menu', { isAdmin: req.session.auth });
  } else {
  res.render('menu', { isAdmin: "nope" });
    
  }
});






module.exports = router;
