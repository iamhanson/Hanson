//首页
var indexR=require('./index');
//博客
var blogR=require('./blog');
// var markdown = require( "markdown-js" );

module.exports = function (app) {
    //首页
    app.get('/', function (req, res) {
        //console.log( markdown.toHTML( "Hello *World*!" ) );
        res.render('index');

    });
    //设置
    app.post('/settings', function (req, res) {
        var getSettings=require('../dao/settings');
        getSettings.settings(function(data){
            res.send(data);
        });
    });
    //获取博客列表
    app.post('/list',function(req,res){
        blogR.getBlogList(req,res);
    });

    //关于信息
    app.get('/about', function (req, res) {  
        res.send('Hello about');
    });

    //获取用户信息
    app.post('/users',function(req,res){
    	var getUsers=require('../dao/readfile.js');
    	var backData=getUsers.getUser(__dirname,function(data){
    		res.send(req.body.who+":"+data);
    	});
    });

    //获取用户信息
    app.get('/users/:who?',function(req,res){
    	var getUsers=require('../dao/readfile.js');
    	var backData=getUsers.getUser(__dirname,function(data){
    		res.send(req.params.who+":"+data);
    	});
    });

    app.get("/hello/:who", function(req, res) {
	  res.end("Hello, " + req.params.who + ".");
	});
    app.get('*', function (req, res) {  
        res.send('Hello 404');
    });
};