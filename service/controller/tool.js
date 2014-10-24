var fs = require('fs');
//工具集对外提供的接口
exports.tool=function(){
	/**
	* @desc 保存文件的工具
	* @param filePath 文件路径
	* @param content 文件内容
	* @param callBack 回调函数
	*/
	this._saveFile=function(filePath,content,callBack){
		fs.writeFile(filePath,content.toString(),'utf8',function(err){
			if(err){
				console.log(err);
				callBack(0);
				return;
			}else{
				callBack(1);
			}
		});
	};
	/**
	* @desc 判断元素是否在数组内
	* @param item 元素
	* @param array 数据组
	*/
	this.inArray=function(item,array){
		var existFlag=false;
		array.forEach(function(arrItem){
			if(arrItem==item){
				existFlag=true;
			}
		});
		return existFlag;
	};
	/**
	* @desc 根据参数获取时间串
	* @param item 元素
	* @param array 数据组
	*/
	this.getDate=function(formatString){
		var DateString="";
		var curDate=new Date();
		var curYear=curDate.getFullYear();
		var curMonth=curDate.getMonth()+1>10?"0"+(curDate.getMonth()+1):curDate.getMonth()+1;
		var curDay=curDate.getDate();
		if(formatString.indexOf("yy")>=0){
			DateString+=curYear;
		}
		if(formatString.indexOf("mm")>=0){
			DateString+=curMonth;
		}
		if(formatString.indexOf("dd")>=0){
			DateString+=curDay;
		}
		if(formatString.indexOf("full")>=0){
			DateString=curYear+"-"+curMonth+"-"+curDay+" "+curDate.getHours()+":"+curDate.getMinutes()+":"+curDate.getSeconds();
		}
		return DateString;
	};
}