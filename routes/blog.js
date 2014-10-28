
//获取博客列表
exports.getBlogList=function(req,res){
	var getBlogs=require('../service/controller/blog');
    getBlogs.blogList(req.body.category,function(data){
    	res.send(data);
    });
}

/**
* @desc 发送博客信息 POST
*/
exports.sendBlog=function(req,res){
    var createBlog=require('../service/controller/blog');
    createBlog.createBlogHandler({"id":req.body.id,"title":req.body.title,"detail":req.body.detail,"category":req.body.category,"tags":req.body.tags},function(data){
        res.send(data);
    });   
}

//删除博客
exports.deleteBlog=function(req,res){
    var deleteBlogs=require('../service/controller/blog');
    deleteBlogs.deleteBlogHandler({"id":req.body.id},function(data){
        res.send(data);
    });
}

/**
* @desc 获取博客详细信息 GET
*/
exports.getBlogDetail=function(req,res){
	var getBlogs=require('../service/controller/blog');
    getBlogs.blogDetailInfo(req.params.id,function(data){
    	res.render('detail',data);
    });
}
/**
* @desc 获取博客详细信息 POST
*/
exports.getBlogDetailPost=function(req,res){
	var getBlogs=require('../service/controller/blog');
    getBlogs.blogDetailInfo(req.body.id,function(data){
    	res.send(data);
    });
}