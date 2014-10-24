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

/*
* 保存的微博信息
* @param id 微博的ID
* @param title 微博标题
* @param date 微博的发布时间
* @param blogDesc 微博的描叙信息
* @param category 微博的分类
* @param tags 微博的标签
* @param blogFilePath 微博的存储路径
*/
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



/*
* 默认的获取数据返回格式
* @param flag 操作是否成功
* @param msg 操作结果的说明
* @param data 操作要返回的数据
* @param length 返回结果的数量
*/
exports.resultModel=function(flag,msg,data,length){
	this.flag=flag||false;
	this.msg=msg||"default msg.";
	this.data=data||[];
	this.length=length||0;
}