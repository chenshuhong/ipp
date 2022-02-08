var ipp = require('./../../ipp');
global.wx = function(){}
var printer = ipp.Printer("http://172.16.1.60:631/ipp/print");
printer.execute("Get-Printer-Attributes", null, function(err, res){
	console.log(res);
	console.log(err)
});

