var ipp = require('./../ipp');

var printer = ipp.Printer("http://cp02.local.:631/ipp/printer");
printer.execute("Get-Printer-Attributes", null, function(err, res){
	console.log(res);
});

