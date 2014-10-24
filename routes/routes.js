//博客
var blogR=require('./blog');
// var markdown = require( "markdown-js" );

module.exports = function (app) {
    //首页
    app.get('/', function (req, res) {
        res.render('index');
    });

    //获取页面配置
    app.post('/settings', function (req, res) {
        var getSettings=require('../service/controller/config');
        getSettings.settings(function(data){
            res.send(data);
        });
    });
    //获取博客列表
    app.post('/list',function(req,res){
        blogR.getBlogList(req,res);
    });

    //获取博客详细
    app.get('/blogs/:id',function(req,res){
        blogR.getBlogDetail(req,res);
    });

    app.get('/admin',function(req,res){
        res.render('admin');
    });
    app.get('/createblog',function(req,res){
        res.render('createblog');
    });
    app.get('/editblog',function(req,res){
        res.render('editblog');
    });

    app.post('/sendblog',function(req,res){
        blogR.sendBlog(req,res);
    });
    app.post('/deleteblog',function(req,res){
        blogR.deleteBlog(req,res);
    });
    
    //获取博客详细
    app.post('/blogs',function(req,res){
        blogR.getBlogDetailPost(req,res);
    });

    //关于信息
    app.get('/about', function (req, res) {  
        res.send('Hello about');
    });

    //获取用户信息
    app.post('/users',function(req,res){
    	var getUsers=require('../service/readfile.js');
    	var backData=getUsers.getUser(__dirname,function(data){
    		res.send(req.body.who+":"+data);
    	});
    });

    //获取用户信息
    app.get('/users/:who?',function(req,res){
    	var getUsers=require('../service/readfile.js');
    	var backData=getUsers.getUser(__dirname,function(data){
    		res.send(req.params.who+":"+data);
    	});
    });

    //404页面
    app.get('*', function (req, res) {  
        res.render('404');
    });
};