var fs = require('fs');
//返回的博客列表信息
var resultData={
	flag:false,
	msg:"msg",
	data:{}
}

//博客信息
var blogInfo=function(){
	this.title="";
	this.date="";
	this.content="";
	this.category="";
}
// var blogInfo={
// 	title:"",
// 	date:"",
// 	content:"",
// 	category:""
// }
/**
*获取博客的信息
*/
var _getBlogInfo=function(data){
	var infoData=data.substring(0,data.indexOf("+-*/"));
	infoData="{"+infoData+"}"
	var infoJson=eval("("+infoData+")");
	var thisblogInfo=new blogInfo();
	thisblogInfo.title=infoJson.title;
	thisblogInfo.date=infoJson.date;
	thisblogInfo.category=infoJson.category;
	thisblogInfo.content=data.substring(data.indexOf("+-*/")+4,data.length);
	return thisblogInfo;
}
//获取博客列表
exports.blogList=function(category,callBack){
	fs.readdir('./blogs', function (err, files) {
		//files为该目录下的文件名数组['1.jpg','1.md']
		if (err) {
			resultData.flag=false;
			resultData.msg=err;
			return;
		}
		resultData.flag=true;
		resultData.msg="get data normaly";
		var count = files.length;
		var results = [];
		files.forEach(function (filename) {
			fs.readFile('./blogs/'+filename, 'utf8',function (err,data) {
				if (err) {
					resultData.flag=false;
					resultData.msg=err;
					resultData.data=results;
			        callBack(resultData);
					return;
				}
				results.push(_getBlogInfo(data));
				count--;
				//文件全部遍历完
			    if (count <= 0) {
			        resultData.data=results;
			        callBack(resultData);
			    }
			});
		});		
	});
}