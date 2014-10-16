var fs = require('fs');
//获取文件之后打印
exports.getUser=function(dir,backFunc){
	fs.readFile(dir+'/dao/data/user.txt','utf8', function (err, logData) {
		if (err) throw err;
		backFunc.call(this,logData);
	});
}