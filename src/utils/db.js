const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
const databseName= 'user-db'



const addUser = (user) =>{
    insertUser(user)

}


const listUsers = (callback) => {
    getUser((user) =>{
         console.log(user.lenght)
            callback(user)

    })

    
}


const insertUser= (user)=>{

    MongoClient.connect(
        connectionURL,
        { useNewUrlParser: true},
        (err,client) => {
            if(err) {
                return console.log(err)
            } 
    
            const db = client.db(databseName)
    
            db.collection('users').insertOne(user,
                (error,result) =>{
                if(error){
                    return console.log('ubanble to insrt')
                }
    
                //console.log(result.ops)
            })
            
        }
    )

 
}


const getUser= (callback) =>{
    let users;
    MongoClient.connect(
        connectionURL,
        { useNewUrlParser: true},
        (err,client) => {
            if(err) {
                return console.log(err)
            } 
    
            const db = client.db(databseName)
    
            db.collection('users').find().toArray((error,arr) =>{
                if(error)
                    callback({})
                callback(arr)                
            })
            
        }
    )
   

}



module.exports = {
	addUser: addUser,
	listUsers: listUsers
}

