var ipp = require('./../ipp');

var printer = ipp.Printer("http://172.16.1.60:631/ipp/printer");
printer.execute("Get-Printer-Attributes", null, function(err, res){
	console.log(res);
});

