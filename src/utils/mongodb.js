const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
const databseName= 'user-db'

MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true},
    (err,client) => {
        if(err) {
            return console.log(err)
        } 

        const db = client.db(databseName)

        db.collection('usres').insertOne({
            name: 'Vinayak',
            age: 27
        },(error,result) =>{
            if(error){
                return console.log('ubanble to insrt')
            }

            console.log(result.ops)
        })

        db.collection('usres').findOne({name: 'Vinayak'},(error,user) =>{
            if(error){
                return console.log(error)
            }
            console.log(user)
        })
        
    }
)