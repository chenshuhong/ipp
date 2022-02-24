global.wx = function(){}
const ipp = require('../../ipp.js');
const uri = "http://172.16.1.60:631/ipp/print";
const serializeData = ipp.serialize({
    "operation":"Get-Printer-Attributes",
    "operation-attributes-tag": {
        "attributes-charset": "utf-8",
        "attributes-natural-language": "en",
        "printer-uri": uri
    }
});




ipp.request(uri,serializeData,function (err,res){
    console.log(err,res)
})
