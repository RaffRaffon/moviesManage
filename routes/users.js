var express = require('express');
var router = express.Router();
const usersJsonDAL = require('../dals/usersJsonDAL')
const usersBL = require('../bls/usersBL')
/* GET home page. */
router.get('/', async function (req, res, next) {
  if (req.session.auth) {
    let response = await usersJsonDAL.getAllUsers()
    let allUsers = response.users
    res.render('usersManagement', { allUsers: allUsers });
  } else {
    res.render('notAdmin', {})

  }
});

router.get('/delete/:username', async function (req, res, next) {
  if (req.session.auth) {
    usersBL.deleteUser(req.params.username)
    res.render('deletedUser', { username: req.params.username })
    
  } else {
    res.render('notAdmin', {})
  }

});

router.get('/makechange/:username', async function (req, res, next) {
  if (req.session.auth && req.params.username!="addNew") {
    let userObj=await usersBL.getUser(req.params.username)
    res.render('userDataPage',{userObj:userObj})
  } else if (req.params.username==="addNew") {
    userObj={"id": "",
    "Username": "",
    "Password": "",
    "CreatedDate": "",
    "TransactionsNum": ""}
    res.render('userDataPage',{userObj:userObj})
  } else {
    res.render('notAdmin', {})

  }
});
router.post('/update', async function (req, res, next) {
  usersBL.updateUser(req.body)
  res.render('updatedUser',{username:req.body.Username})  
});

router.post('/addNew', async function (req, res, next) {
  usersBL.addUser(req.body)
  res.render('updatedUser',{username:req.body.Username})  

});



module.exports = router
