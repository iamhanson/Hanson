
//获取博客列表
exports.getBlogList=function(req,res){
	//req,res,req.body.category
	var getBlogs=require('../dao/blogdao');
        getBlogs.blogList("category",function(data){
        	res.send(data);
        });
}