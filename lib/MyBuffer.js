let MyBuffer = null
if(typeof wx === 'function'){
    console.log('wx env')
    MyBuffer = require('buffer/').Buffer
}else{
    MyBuffer = Buffer
}

module.exports = MyBuffer