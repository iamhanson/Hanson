var fs = require('fs');
//获取文件之后打印
exports.settings=function(callBack){
	fs.readFile(__dirname+'\\data\\settings.txt','utf8', function (err, logData) {
		if (err) throw err;
		callBack.call(this,logData);
	});
}