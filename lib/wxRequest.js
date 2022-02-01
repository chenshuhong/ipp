const MyBuffer = require('./MyBuffer')
const parse = require('./parser');

module.exports = function(opts, buffer){
	return new Promise((resolve,reject)=>{
		//All IPP requires are POSTs- so we must have some data.
		//  10 is just a number I picked- this probably should have something more meaningful
		if(!MyBuffer.isBuffer(buffer) || buffer.length<10){
			reject(new Error("Data required"));
		}
		wx.request({
			url:opts,
			method:'POST',
			header:{
				'Content-Type':'application/ipp'
			},
			data:buffer,
			responseType:'ArrayBuffer',
			success:(buf)=>{
				resolve(parse(buf))
			},
			fail:(err)=>{
				reject(err)
			}
		})
	})
};
