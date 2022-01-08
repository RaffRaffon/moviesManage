var express = require('express');
var router = express.Router();
let loginBL = require('../bls/loginBL')
let moviesBL = require('../bls/moviesBL')
let lastIdDALBL = require('../dals/restAPIDAL')
let usersBL = require('../bls/usersBL')

let namesToDisplay
let sameGenreMovies
let allMovies
let searchQuery
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('searchMovies', {});
});

router.post('/', async function (req, res, next) {
  let userDetails = await usersBL.getUser(req.session.username)
  if (userDetails.TransactionsNum !== "0") {
    if (req.session.username !== "admin") {
      await usersBL.reduceTotalTransaction(req.session.username)
    }
    namesToDisplay = await moviesBL.returnMovieNames(req.body.name)
    searchQuery = req.body.name
    res.redirect('/searchMovies/results')
  } else {
    res.redirect('/')
  }
})

router.get('/results', async function (req, res, next) {

  allMovies = await moviesBL.returnMergedMovies()
  res.render('searchResults', { names: namesToDisplay, searchQuery: searchQuery })

})

router.get('/results/:movieName', async function (req, res, next) {
  sameGenreMovies = await moviesBL.returnMoviesWithTheSameGenre(req.params.movieName)
  res.render('searchResultsData', { name: req.params.movieName, movies: sameGenreMovies })
})

router.get('/results/data/:movieName', async function (req, res, next) {
  let userDetails = await usersBL.getUser(req.session.username)
  if (userDetails.TransactionsNum !== "0") {
    if (req.session.username !== "admin") {
      await usersBL.reduceTotalTransaction(req.session.username)
    }
    let movieDetails = await moviesBL.returnMovieDetails(req.params.movieName)
    res.render('movieDataPage', { movieDetails: movieDetails, searchQuery: searchQuery })
  } else {
    res.redirect('/')
  }
})



module.exports = router;