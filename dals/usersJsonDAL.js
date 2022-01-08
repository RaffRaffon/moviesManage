const jsonfile=require('jsonfile')

function getAllUsers(){
const file = 'C:/Users/VSC/Desktop/midNodeProject/jsons/Users.json'
    return new Promise((resolve,reject)=>{
        jsonfile.readFile(file, function (err, obj) {
            if (err) reject(err)
            else resolve(obj)
          })
    })
}
module.exports={getAllUsers}
