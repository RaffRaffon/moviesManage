var express = require('express');
var router = express.Router();
let moviesBL = require('../bls/moviesBL')
let lastIdDALBL = require('../dals/restAPIDAL')
let usersBL = require('../bls/usersBL')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('createMovie', {});
});

router.post('/', async function (req, res, next) {
  let isMoviesArrayEmpty = await moviesBL.checkNewMovies()
  let lastId
  if (isMoviesArrayEmpty.length === 0) {
    lastId = await lastIdDALBL.lastId()
    lastId++
  } else {
    lastId = isMoviesArrayEmpty[isMoviesArrayEmpty.length - 1].id
    lastId++
  }
  let movieDetails = { id: lastId, name: req.body.name, language: req.body.language, genres: req.body.genres }
  let genres = movieDetails.genres.split(" ")
  movieDetails.genres = genres
  let onSuccess = await moviesBL.saveMovie(movieDetails)
  if (onSuccess) {
    let userDetails = await usersBL.getUser(req.session.username)
  if (userDetails.TransactionsNum !== "0") {
    if (req.session.username!=="admin") {
      await usersBL.reduceTotalTransaction(req.session.username)
      }
    res.redirect('/menu')
  } else {
    res.redirect('/')
  }
}
});


module.exports = router;