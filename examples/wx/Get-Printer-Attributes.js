global.wx = function(){}
var ipp = require('./../../ipp');
var printer = ipp.Printer("http://172.16.1.19:631/ipp/print");
printer.execute("Get-Printer-Attributes", null, function(err, res){
	console.log(res);
	console.log(err)
});

