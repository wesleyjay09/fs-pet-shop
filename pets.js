//access the file system
var fs = require('fs')
//
var arg = process.argv.splice(2)


if(arg[0] === undefined) {
console.error('Usage: node pets.js [read | create | update | destroy]')
process.exit(1) 
} else {
switch(arg[0]){
case "read": read()
    break;
case "create" : create()
    break;
case "update" : update()
    break;
case "destroy" : destroy()
    default:  console.error('Usage: node pets.js [read | create | update | destroy]')

}
}

function update() { //
    // arg 1 is location arg 2 is age arg 3 is type arg 4 is name
    if(arg[1] === undefined || arg[2] === undefined || arg[3] === undefined || arg[4] === undefined|| isNaN(arg[2])){
            console.error('undefined error')
        } else {
        fs.readFile('./pets.json','utf8',function(err,data){
            if(err){
                console.error('undefined error')
            } else {
                let pets = JSON.parse(data)
                pets[arg[1]] = 
                {
                    'age' : parseInt(arg[2]),
                    'kind' : arg[3],
                    'name' : arg[4], 
                }
                fs.writeFile("./pets.json", (JSON.stringify(pets)),function (error) {
                    if(error){
                        console.error('undefined error')
                    } else {
                        console.log('success')
                    }
                })
            }
        })
    }
}





function read(){
    fs.readFile('./pets.json','utf8',function(err,data){
        if(err){
            console.error('undefined error')
        } else {
            if(JSON.parse(data)[arg[1]] != undefined){
                console.log(JSON.parse(data)[arg[1]])
            } else {
                console.log(`Usage: node pets.js read [0-${JSON.parse(data).length -1}]`)
            }
        }
    })
}



function create() {
    if(arg[1] === undefined || arg[2] === undefined || arg[3] === undefined || isNaN(arg[1])){
        console.error('Usage: node pets.js create [age] [kind] [name]')
    } else {
        fs.readFile('./pets.json','utf8',function(error,data){
            if(error){
                console.error('undefined error')
            } else {
                let pets = JSON.parse(data)
                pets.push({
                    'age': parseInt(arg[1]),
                    'kind': arg[2],
                    'name': arg[3]
                })
                fs.writeFile("./pets.json", (JSON.stringify(pets)),function (error) {
                    if(error){
                        console.error('undefined error')
                    } else {
                        console.log('success')
                    }
                })
            }
        })
    }
}

function destroy(){
      // arg 1 is location arg 2 is age arg 3 is type arg 4 is name
if(arg[1] === undefined ){
        console.error('undefined error')
    } else {
    fs.readFile('./pets.json','utf8',function(err,data){
        if(err){
            console.error('undefined error')
        } else {
            let pets = JSON.parse(data)
             pets.splice(arg[1], 1)
            fs.writeFile("./pets.json", (JSON.stringify(pets)),function (error) {
                if(error){
                    console.error('undefined error')
                } else {
                    console.log('success')
                }
            })
        }
    })
}
}
