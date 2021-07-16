const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const ObjectID = mongodb.ObjectID


const connectionURL ='mongodb://127.0.0.1:27017'

const databaseName = 'dyte-webhooks'

MongoClient.connect(connectionURL,{useNewUrlParser:true}, (error, client)=>{
    if(error){
      return console.log("Unable to connect to database")
    }

    console.log("Connected!")

    const db = client.db(databaseName)

})

