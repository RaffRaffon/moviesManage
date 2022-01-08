const jsonfile = require('jsonfile')
const usersJsonDAL = require('../dals/usersJsonDAL')


async function deleteUser(username) {
    let response = await usersJsonDAL.getAllUsers()
    let allUsers = response.users
    let newUsersArray = allUsers.filter(user => (!(user.Username === username)))
    const file = 'C:/Users/VSC/Desktop/midNodeProject/jsons/Users.json'
    const obj = { users: newUsersArray }
    jsonfile.writeFile(file, obj, function (err) {
        if (err) console.error(err)
    })
}
async function getUser(username) {
    try {
        let usersArray = await usersJsonDAL.getAllUsers()
        let userToReturn
        userToReturn = usersArray.users.filter(user => user.Username === username)
        return userToReturn[0]
    } catch (err) {
        console.log(err)
    }
}
async function updateUser(userObj) {
    let usersArray = []

    const file = 'C:/Users/VSC/Desktop/midNodeProject/jsons/Users.json'
    jsonfile.readFile(file, function (err, obj) {
        if (err) console.error(err)
        usersArray = obj.users.map(user => {
            if (user.id === userObj.id) {
                return userObj
            } else {
                return user
            }
        })
        let objToWrite={users:usersArray}
        jsonfile.writeFile(file, objToWrite, function (err) {
            if (err) console.error(err)
          })
    })
}
async function addUser(userObj){
    let usersArray = []

    const file = 'C:/Users/VSC/Desktop/midNodeProject/jsons/Users.json'
    jsonfile.readFile(file, function (err, obj) {
        if (err) console.error(err)
        usersArray = obj.users
        usersArray.push(userObj)
        let objToWrite={users:usersArray}
        jsonfile.writeFile(file, objToWrite, function (err) {
            if (err) console.error(err)
          })
    })
}

async function reduceTotalTransaction(username){
let userObj = await getUser(username)
userObj.TransactionsNum=String(Number(userObj.TransactionsNum)-1)
await updateUser(userObj)
}
module.exports = { deleteUser, getUser, updateUser,addUser,reduceTotalTransaction }
