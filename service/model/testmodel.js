
exports=function(){
	this.blogInfo=function(){
		//文章标题
		this.title="1";
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
	this.blogDetail=function(){
		this.id="2";
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
};
