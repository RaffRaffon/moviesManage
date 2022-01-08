const jsonfile = require('jsonfile')
let lastIdChecker = require('../dals/restAPIDAL')
let restAPIDAL = require('../dals/restAPIDAL')
let newMoviesJsonDAL = require('../dals/newMoviesJsonDAL')

async function saveMovie(movieObj) {
  lastId = lastIdChecker.lastId()
  return new Promise(resolve => {
    const file = 'jsons/NewMovies.json'
    const movieObj2 = movieObj
    let array = [movieObj2]
    let isSuccess = false
    jsonfile.readFile(file, function (err, obj) {
      if (err) console.error(err)
      else { obj.push(movieObj) }
      jsonfile.writeFile(file, obj, function (err) {
        if (err) console.error(err)
        else {
          isSuccess = true
          resolve(isSuccess)
        }
      })
    })
  })
}

async function checkNewMovies() {
  return new Promise(resolve => {
    const file = 'jsons/NewMovies.json'
    jsonfile.readFile(file, function (err, obj) {
      if (err) console.error(err)
      else resolve(obj)
    })
  })
}

async function returnMergedMovies() {
  let allMoviesFromAPI = await restAPIDAL.getAllMovies()
  let allMoviesFromJSON = await newMoviesJsonDAL.getAllNewMovies()
  let allMovies = []
  allMoviesFromAPI.forEach(movie => {
    allMovies.push(movie)
  })
  allMoviesFromJSON.forEach(movie => {
    allMovies.push(movie)
  })
  return allMovies
}
async function returnMovieDetails(name){
  let allMovies = await returnMergedMovies()
  let movieObjToReturn=allMovies.filter(movie=>
    movie.name===name
  )
  return movieObjToReturn[0]
}

async function returnMovieNames(query){
  let allMovies = await returnMergedMovies()
  let moviesNamesToReturn=[]
  allMovies.forEach(movie=>{
    if (movie.name.includes(query)){
      moviesNamesToReturn.push(movie.name)
    }
  })
  return moviesNamesToReturn
}
async function returnMoviesWithTheSameGenre(searchedMovieName) {
  let allMovies = await returnMergedMovies()
  let movieToSearchBy
  allMovies.forEach(movie => {
    if (movie.name === searchedMovieName) {
      movieToSearchBy = movie
    }
  })
  let filteredArray = allMovies.filter(movie => {

    let genresOfMovieFromAllMovies = movie.genres
    genresOfMovieFromAllMovies.sort()
    genresOfMovieFromAllMovies = JSON.stringify(genresOfMovieFromAllMovies)
    let genresOfMovieToSearchBy = movieToSearchBy.genres.sort()
    genresOfMovieToSearchBy = JSON.stringify(genresOfMovieToSearchBy)
    return genresOfMovieFromAllMovies === genresOfMovieToSearchBy
  })
  let namesOnly=filteredArray.map(movie=>movie.name)
  return namesOnly
}
module.exports = { saveMovie, checkNewMovies, returnMergedMovies ,returnMoviesWithTheSameGenre,returnMovieNames,returnMovieDetails }