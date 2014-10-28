var fs = require('fs');
//博客的相关model
var blogModel=require("../model/blogmodel");
var tools=require("../controller/tool");

/**
* @desc 获取博客的信息
* @param data 需要处理的数据
*/
var _getBlogInfo=function(data){
	var infoData=data.substring(0,data.indexOf("+-*/"));
	infoData="{"+infoData+"}"
	var infoJson=eval("("+infoData+")");
	//博客展示在列表里的信息
	var thisblogInfo=new blogModel.blogInfo();
	thisblogInfo.title=infoJson.title;
	thisblogInfo.date=infoJson.date;
	thisblogInfo.category=infoJson.category;
	thisblogInfo.content=data.substring(data.indexOf("+-*/")+4,data.length);
	return thisblogInfo;
}

/**
* @desc 获取博客详细信息
* @param blogItem 博客列表信息
* @param callBack 数据获取OK之后的回调
*/
var _getBlogDetail=function(blogItem,callBack){ 
	var marked = require('marked');
	var blogDetail=new blogModel.blogDetail();
		fs.readFile('./blogs/'+blogItem.blogFilePath, 'utf8',function (err,data) {
			if (err) {
				blogDetail.id=0;
				blogDetail.title="none";
				blogDetail.date="none";
				blogDetail.blogDesc="none";
				blogDetail.category=[];
				blogDetail.tags=[];
				blogDetail.detail="none";
				callBack(new blogModel.resultModel(false,err,blogDetail,0));
				return;
			}
			blogDetail.id=blogItem.id;
			blogDetail.title=blogItem.title;
			blogDetail.date=blogItem.date;
			blogDetail.blogDesc=marked(blogItem.blogDesc);
			blogDetail.category=blogItem.category;
			blogDetail.tags=blogItem.tags;
			blogDetail.detail=marked(data);
		    callBack(new blogModel.resultModel(true,"get data normaly",blogDetail,1));
		});
}

/**
* @desc 对博客列表进行筛选
* @param category 类型
* @param pageIndex 开始页码
* @param PageSize 每页包含多少数据
* @param callBack 数据获取OK之后的回调
*/
var _blogListSelect=function(category,pageIndex,PageSize,data,callBack){
	//初始化工具集
	var toolCore=new tools.tool();
	var tempLength=0;
	if(category){
		var tempResult=[];
		var count=data.length;
		data.forEach(function(blogItem){
			if(toolCore.inArray(category,blogItem.category)){
				tempLength++;
				tempResult.push(blogItem);
			};
			count--;
			if(count<=0){
				callBack(new blogModel.resultModel(true,"get data normaly",tempResult,tempLength));
			}
		});
	}else{
		callBack(new blogModel.resultModel(true,"get data normaly",data,data.length));
	}
};

/**
* @desc 最终保存文件
* @param filePath 文件路径
* @param content 文件内容
* @param callBack 回调函数
*/
var _saveBlog=function(filePath,content,callBack){
	var marked = require('marked');
	fs.writeFile(filePath,content.toString(),'utf8',function(err){
		if(err){
			console.log(err);
			callBack(new blogModel.resultModel(false,err,[],0));
			return;
		}
		callBack(new blogModel.resultModel(true,"blog created!",marked(content.toString()),0));
	});
};

/*
* 保存blog到指定文件夹
* @param sendData 发送的数据
* @param callBack 处理完成后的回调
*/
var _updateBlogDB=function(sendData,callBack){
	fs.readFile('./service/data/blog.db.js','utf8',function (err,data) {
		if (err) {
			console.log(err);
			callBack(new blogModel.resultModel(false,err,[],0));
			return;
		}
		var blogDB=eval("("+data+")");
		var existFlag=false;
		var listCount=blogDB.blogList.length;
		blogDB.blogList.forEach(function(item){
			if(item.id==sendData.id){
				existFlag=true;
				item.title=sendData.title;
				item.date=sendData.date;
				item.blogDesc=sendData.blogDesc;
				item.category=sendData.category;
				item.tags=sendData.tags;
				item.blogFilePath=sendData.blogFilePath;
				return;
			}
		});
		if(!existFlag){
			blogDB.blogList.unshift(sendData);	
		}
		fs.writeFile('./service/data/blog.db.js',JSON.stringify(blogDB),"utf8",function(err){
			if(err){
				console.log(err);
				callBack(existFlag,new blogModel.resultModel(false,err,[],0));
				return;
			}
			callBack(existFlag,new blogModel.resultModel(true,"bloglist add successful.",[],0));
		});
	});
};

/*
* 删除博客
* @param filePath 要删除的博客的位置
* @param callBack 处理完成后的回调
*/
var _deleteBlog=function(filePath,callBack){
	fs.unlink(filePath,function(err){
		if(err){
			console.log(err);
			callBack(0);
			return;
		}
		callBack(1)
	});
};

/*
* 删除博客列表
* @param index 要删除的博客的列表索引
* @param callBack 处理完成后的回调
*/
var _deleteBlogFromList=function(index,callBack){
	fs.readFile('./service/data/blog.db.js', 'utf8',function (err,data) {
		if (err) {
			callBack(0);
			return;
		}
		var blogDB=eval("("+data+")");
		blogDB.blogList.splice(index,1);
		var toolCore=new tools.tool();
		toolCore._saveFile('./service/data/blog.db.js',JSON.stringify(blogDB),function(data){
			callBack(data);
		});
	});
};

/*
* 删除博客
* @param sendData 发送的数据
* @param callBack 处理完成后的回调
*/
exports.deleteBlogHandler=function(id,callBack){
	fs.readFile('./service/data/blog.db.js', 'utf8',function (err,data) {
		if (err) {
			callBack(new blogModel.resultModel(false,err,{"result":-1},0));
			return;
		}
		var blogDB=eval("("+data+")");
		var count=blogDB.blogList.length;
		var existFlag=false;
		blogDB.blogList.forEach(function(item,index){
			if(item.id==id.id){
				existFlag=true;
				_deleteBlogFromList(index,function(data){
					if(data==1){
							_deleteBlog("./blogs/"+item.blogFilePath,function(data){
								if(data==1){
									callBack(new blogModel.resultModel(true,"删除成功",{"result":1},0));
									console.log("blog delete ok!");
								}else{
									callBack(new blogModel.resultModel(false,"删除失败",{"result":-1},0));
									console.log("删除失败");
								}
							});
						}else{
							callBack(new blogModel.resultModel(false,"删除失败",{"result":-1},0));
							console.log("删除失败");
						}
				});
			}
			count--;
			if(count<=0){
				if(!existFlag){
					console.log("指定的博客不存在！");
					callBack(new blogModel.resultModel(false,"指定的博客不存在！",{"result":-1},0));
				}
			}
		});
	});
};

/*
* 保存blog到指定文件夹
* @param sendData 发送的数据
* @param callBack 处理完成后的回调
*/
exports.createBlogHandler=function(sendData,callBack){
	//初始化工具集
	var toolCore=new tools.tool();
	var filePath=toolCore.getDate("yymm");
	var fileName=sendData.id||new Date().getTime();
	var listData=new blogModel.saveBlogInfo(fileName,sendData.title,
				toolCore.getDate("full"),
				sendData.detail.substring(0,100),
				sendData.category,
				sendData.tags,
				filePath+"/"+fileName+".md");
	//检查年月文件夹是否存在，如果不存在，则新建
	fs.exists("./blogs/"+filePath,function(exists){
		if(exists){
			_updateBlogDB(listData,function(existFlag,result){
				if(result.flag){
					_saveBlog("./blogs/"+filePath+"/"+fileName+".md",sendData.detail,function(data){
						callBack(data);
					});
				}else{
					callBack(result)
				}
			});
		}else{
			fs.mkdir("./blogs/"+filePath,function(err){
				if(err){
					console.log(err);
					callBack(new blogModel.resultModel(false,err,[],0));
					return;
				}
				_updateBlogDB(listData,function(existFlag,result){
					if(result.flag){
						_saveBlog("./blogs/"+filePath+"/"+fileName+".md",sendData.detail,function(data){
							callBack(data);
						});
					}else{
						callBack(result)
					}
				});
			});
		}
	});
};

/**
* @desc 获取博客列表
* @param category 类型
* @param callBack 数据获取OK之后的回调
*/
exports.blogList=function(category,callBack){
	//要返回的博客列表数据
	fs.readFile('./service/data/blog.db.js', 'utf8',function (err,data) {
		if (err) {
			callBack(new blogModel.resultModel(false,err,[],0));
			return;
		}
		var blogDB=eval("("+data+")");
		_blogListSelect(category,1,20,blogDB.blogList,function(result){
			callBack(result);
		});
	});
};

/**
* @desc 获取博客详细信息
* @param blogId 博客的ID标识
* @param callBack 数据获取OK之后的回调
*/
exports.blogDetailInfo=function(blogId,callBack){
	if(!blogId||blogId==""){
		callBack([]);
		return;
	}
	fs.readFile('./service/data/blog.db.js', 'utf8',function (err,data) {
		if (err) {
			callBack(new blogModel.resultModel(false,err,[],0));
			return;
		}
		var blogDB=eval("("+data+")");
		var existFlag=false;
		blogDB.blogList.forEach(function(item){
			if(item.id==blogId){
				existFlag=true;
				_getBlogDetail(item,function(result){
					callBack(result);
				});
				return;
			}
		});
		if(!existFlag){
			callBack(new blogModel.resultModel(false,"no data find.",[],0));
		}
	});
};
