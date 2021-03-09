const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs')
const PORT = process.env.PORT || 8000
const petsJson = require('./pets.json')


const app = express();

// middleware
app.use(express.json())


// get request to send all
app.get('/pets',(req,res)=>{
    res.send(petsJson);
});
// get request to send one
app.get('/pets/:id', (req, res) =>{
    let id = req.params.id
    res.send(petsJson[id]);
});
// create request 
app.post('/pets',(req,res)=>{
    let {name,age,kind} = req.body[0]
    let newPet = {
        name,
        age,
        kind
    }
    petsJson.push(newPet);
    fs.writeFile("./pets.json",JSON.stringify(petsJson),function(error){
        if(error){
            res.status(400,'undefined error')
        }
    })
    res.send(petsJson);
 })
// update request 
app.put("/pets/:id", (req, res)=>{
    let id = req.params.id
    if(id >= petsJson.length){
        res.status(400,'Pet not found')
        res.send('Pet not found')
    }
    let {name,age,kind} = req.body[0]
    petsJson[id] = {
        name,
        age,
        kind
    }
    fs.writeFile("./pets.json",JSON.stringify(petsJson),function(error){
        if(error){
            res.status(400,'undefined error')
        }
    })
    res.send(petsJson[id]);
})


// delete request 
app.delete("/pets/:id", (req, res) => {
    let id =req.params.id
    if(id >= petsJson.length){
        res.status(400, "Pet not found")
        res.send('pet not found')
    }
    delete petsJson[id]
    fs.writeFile("./pets.json",JSON.stringify(petsJson),function(error){
        if(error){
            res.status(400,'undefined error')
        }
    })
    res.send(`the pet is gone :(`)
})


app.listen(PORT, ()=>{
    console.log('Listining on PORT 8000')
})