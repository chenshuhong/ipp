global.wx = function(){}
var ipp = require('../../ipp');
var PDFDocument = require('pdfkit');
var concat = require("concat-stream");

var doc = new PDFDocument({margin:0});
doc.text("gggggg", 0, 0);


doc.pipe(concat(function (data) {
	var printer = ipp.Printer("http://172.16.1.19:631/ipp/printer");
	var msg = {
		"operation-attributes-tag": {
			"requesting-user-name": "Bumblebee",
			"job-name": "whatever.pdf",
			"document-format": "application/pdf"
		}
		, data: data
	};
	printer.execute("Print-Job", msg, function(err, res){
		console.log(err);
		console.log(res);
	});
}));
doc.end();
