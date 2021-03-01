'use strict'

const { error } = require('console');
const fs = require('fs');
const http = require('http');
const { url } = require('inspector');
const path = require('path')
const port = process.env.PORT || 8000;

const petsPath = path.join(__dirname,'pets.json');

const server = http.createServer(function(req,res){
    var urlNumber = req.url.slice(6)
    var urlStart = req.url.slice(0,6)
    console.log(urlStart)
    if(req.method === 'GET') {
        fs.readFile(petsPath,'utf8',function(err,data){
            var pets = JSON.parse(data)
            var petsRequested = pets[urlNumber]
            var petStr = JSON.stringify(petsRequested) 
            if(urlStart !== "/pets/"){
                
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Not Found');
             } else 
            if(err) {
                console.error(err, stack)
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Not Found');
            } else if(urlNumber === ""){
                
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(data)
            } else if(urlNumber > -1 && urlNumber < pets.length){
              
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(petStr)
            } else {
              
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/plain')
                res.end(`Please enter a valid url ending [0-${(pets.length-1)}]`)
                    
                
            }
        })

    }    
})


server.listen(port,function() {
    console.log('Listening on port', port)
})