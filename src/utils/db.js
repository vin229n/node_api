const fs = require('fs')

const addUser = (user) =>{

    const users = loadUsers()
    
    users.push({
        name:user.name,
        password:user.password
    })
    saveUsers(users)

}


const listUsers = () => {
    const users = loadUsers()
    if(users.length > 0)
    {
        return users
    }
    else
        return []
    
}


const saveUsers = (users)=>{
    const dataJSON = JSON.stringify(users)
    fs.writeFileSync('db.json',dataJSON)
}

const loadUsers = ()=>{
    try{
        const dataBuffer = fs.readFileSync('db.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

module.exports = {
	addUser: addUser,
	listUsers: listUsers
}

