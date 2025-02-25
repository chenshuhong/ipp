
var serialize = require('./serializer'),
	extend = require('./ipputil').extend;
var request
if(typeof wx!=='undefined'){
	request = require('./wxRequest')
}else {
	request = require('./request')
}

function Printer(url, opts){
	if(!(this instanceof Printer)) return new Printer(url, opts);
	opts = opts || {};
	if(typeof wx!=='undefined'){
		this.url = url
		this.uri = url.replace('http','ipp')
	}else{
		var parseurl = require('url').parse
		this.url = typeof url==="string"? parseurl(url) : url;
		this.uri = opts.uri || 'ipp://' + this.url.host + this.url.path;
	}
	this.version = opts.version || '2.0';
	this.charset = opts.charset || 'utf-8';
	this.language = opts.language || 'en-us';
}
Printer.prototype = {
	_message: function(operation, msg){
		if(typeof operation === "undefined") operation = 'Get-Printer-Attributes';

		var base = {
			version: this.version,
			operation: operation,
			id: null,//will get added by serializer if one isn't given
			'operation-attributes-tag': {
				//these are required to be in this order
				'attributes-charset': this.charset,
				'attributes-natural-language': this.language,
				'printer-uri': this.uri
			}
		};
		//these are required to be in this order
		if(msg && msg['operation-attributes-tag']['job-id'])
			base['operation-attributes-tag']['job-id'] = msg['operation-attributes-tag']['job-id'];
		//yes, this gets done in extend()- however, by doing this now, we define the position in the result object.
		else if(msg && msg['operation-attributes-tag']['job-uri'])
			base['operation-attributes-tag']['job-uri'] = msg['operation-attributes-tag']['job-uri'];

		msg = extend(base, msg);
		if(msg['operation-attributes-tag']['job-uri'])
			delete msg['operation-attributes-tag']['printer-uri'];
		return msg;
	},
	execute: function(operation, msg, cb, opts){
		msg = this._message(operation, msg);
		var buf = serialize(msg);
//		console.log(buf.toString('hex'));
//		console.log(JSON.stringify(
//			require('./parser')(buf), null, 2
//		));
		return request(this.url, buf, cb,opts);
	}
}

module.exports = Printer;
