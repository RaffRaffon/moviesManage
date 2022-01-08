let usersJsonDAL = require('../dals/usersJsonDAL')




async function getUser(username, password) {
    try {
        let usersArray = await usersJsonDAL.getAllUsers()
        let userToReturn
        usersArray.users.forEach(user => {
            if (username === user.Username && password === user.Password) {
                userToReturn = user
            }
        })
        return userToReturn
    } catch(err){
        console.log(err)
    }
    
}

async function checkCreds(username, password) {
    try {
        let usersArray = await usersJsonDAL.getAllUsers()
        let isAccessGranted
        for (let user of usersArray.users) {
            if (username === user.Username && password === user.Password) {
                isAccessGranted = true
                return isAccessGranted

            } else {
                isAccessGranted = false

            }
        }
        return isAccessGranted

    } 
    catch(err){
        console.log(err)
    }
    
}


module.exports = { getUser, checkCreds }
