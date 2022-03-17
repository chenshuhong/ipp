let MyBuffer = null
if(typeof wx !== "undefined"){
    console.log('wx env')
    MyBuffer = require('buffer/').Buffer
}else{
    console.log('node env')
    MyBuffer = Buffer
}

module.exports = MyBuffer