const axios = require('axios')
async function lastId() {
    let data = await axios.get("https://api.tvmaze.com/shows")
    return (data.data[data.data.length - 1].id)

}

async function getAllMovies(){
    let data = await axios.get("https://api.tvmaze.com/shows")
    return data.data
}
module.exports={lastId,getAllMovies}