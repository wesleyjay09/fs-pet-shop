const express = require('express');
const app = express();
const port = process.env.PORT || 7000
const router = express.Router()
const fs = require('fs')
const path = require('path')

const petsPath = path.join(__dirname,'pets.json');

// this is for all pets
router.get('/pets', function (req, res, next) {
    fs.readFile(petsPath,'utf8',function(err,data){
        if(err){
            next({status:500, message:`pet file no longer exists`})
        } else {
            res.end(data)
        }
    })
})

// this is for a single pet
router.get(`/pets/:num`,function(req, res, next){
    fs.readFile(petsPath, 'utf8', function(err, data){
        let pet = JSON.parse(data)
        let specificPet = pet[req.params.num]
        let Urlnum = req.params.num
        if(!Number(Urlnum) || Urlnum < -1 || Urlnum >= pet.length){
            next({status:400, message:`Invalid number in URL, please try 0-${pet.length}`})
        } else {
            res.json(`${JSON.stringify(specificPet)}`)
        }
    })
})
app.use('/', router)
app.use((err,req,res,next)=> {
    res.status(400).json(err)
})
app.listen(port,function(){
    console.log(`listening on port ${port}`)
})

