var m_http = require('http');
var m_querystring = require('querystring');
var url = require("url");
var express=require("express");
var ejs=require("ejs");

/*
*get请求获取参数示例(GET PARAM FROM GET)
*request 请求
*/
var _getParamFG=function(request) {
	request.setEncoding('utf8');
    var getQuery = url.parse(request.url).query;
    var getData = m_querystring.parse(getQuery); //getData数据 
    return getData["type"];
};

/*
*get请求获取参数示例(GET PARAM FROM POST)
*request 请求
*/
var _getParamFP=function(request){
	request.setEncoding('utf8');
	request.on('data',function(chunk){
		postData.push(chunk);
	});
    request.on('end', function () {
        var postParam = m_querystring.parse(postData);
        return postParam["type"];
    });
};

//运行实例
exports.run = function (port) {
    var app=express();
    var bodyParser  = require('body-parser');
    app.set('views', __dirname + '/webapp/views');
    app.engine('.html', ejs.__express);
    app.set('view engine', 'html');
    app.use('/script', express.static(__dirname+'/webapp/script'));
    app.use('/css', express.static(__dirname+'/webapp/css'));
    app.use('/fonts', express.static(__dirname+'/webapp/fonts'));
    app.use(require('body-parser').urlencoded({extended: true}));//post请求的参数获取
	var routes = require('./routes/routes')(app);  
	app.listen(port); 
    console.log('Running!');
};