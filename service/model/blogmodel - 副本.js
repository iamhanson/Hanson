
exports=function(){
	
};


//博客列表简要信息
exports.blogInfo=function(){
	//文章标题
	this.title="";
	//文件的发布时间
	this.date="";
	//文章简要内容
	this.blogDesc="";
	//博客年月
	this.blogYM="";
	//文章的文类信息
	this.category=[];
	//标签信息
	this.tags=[];
};

//博客详细信息
exports.blogDetail=function(){
	this.id="";
	//文章标题
	this.title="";
	//文件的发布时间
	this.date="";
	//文章简要内容
	this.blogDesc="";
	//文章的文类信息
	this.category=[];
	//标签信息
	this.tags=[];
	//文章的详细信息
	this.detail="";
};

exports.saveBlogInfo=function(id,title,date,blogDesc,category,tags,blogFilePath){
	this.id=id||"";
	//文章标题
	this.title=title||"";
	//文件的发布时间
	this.date=date||"";
	//文章简要内容
	this.blogDesc=blogDesc||"";
	//文章的文类信息
	this.category=category||[];
	//标签信息
	this.tags=tags||[];
	//博客文件路径
	this.blogFilePath=blogFilePath||"";
};

//默认的博客列表返回
exports.resultModel=function(flag,msg,data,length){
	this.flag=flag||false;
	this.msg=msg||"default msg.";
	this.data=data||[];
	this.length=length||0;
}

//默认的博客列表返回信息
exports.resultFormat=function(){
	this.flag=false;
	this.msg="default msg.";
	this.length=0;
	this.data=[];
};