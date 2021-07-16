const { v4: uuidv4 } = require('uuid');
const express = require('express')
const Register = require('./models/Register')

require('./db/mongoose')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.post('/register', async (req, res)=>{
    const UUID = uuidv4();
    //const register = new Register(req.body) //{targetUrl: , UID: }
    const register = new Register({targetURL: req.body.targetURL, UID: UUID})

    //res.send(UUID)
    
    //const ID = Register.find({targetURL:req.body})
    try {
        await register.save()
        res.send(UUID)
    }
    catch(e){
        res.status(400).send(e)
    }
})


app.put('/update/:id/:newURL', async (req, res) => {

    //res.send(req.params)

    try{
    //   const update =  await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators:true} )
    const update =  await Register.findByIdAndUpdate(req.params.id, req.params.newURL )

      if(!update){
          return res.status(404).send("Couldn't update")
      }
      res.status(200).send("Success!")
    }
    catch(e){
        res.status(400).send(e)
    }
})

app.get('/list', async(req,res)=>{
    try{
        const urls = await Register.find({})
        res.send(urls)
    }
    catch(e){
        res.status(500).send()
    }

})

app.delete('/delete/:id', async (req, res)=>{
    try{
        const url = await Register.findByIdAndDelete(req.params.id)
        if(!url){
            return res.status(404).send("Failed")
        }
        res.send("Successfully deleted")
        //res.send(url)
    }
    catch(e){
        res.status(500).send()
    }
})

app.get('/trigger/:ipAddress', async(req,res)=>{

    const urls = await Register.find({})

})



app.listen(port, ()=>{
    console.log("Server listening to port " + port)
})