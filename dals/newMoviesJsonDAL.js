const jsonfile = require('jsonfile')

function getAllNewMovies() {
    const file = 'C:/Users/VSC/Desktop/midNodeProject/jsons/NewMovies.json'
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file, function (err, obj) {
            if (err) reject(err)
            else resolve(obj)
        })
    })
}

module.exports = { getAllNewMovies }