var indexDo={
	/*
	* 个人信息的model
	*/
	settingModel:function(data){
		var siteSelf=this;
		ko.mapping.fromJS(data, {}, siteSelf); 
	},
	//获取系统的设置
	getSiteSetting:function(){
		$.ajax({
			url:"/settings",
			type:"post",
			dataType:"json",
			success:function(data){ 
				ko.applyBindings(new indexDo.settingModel(data),document.getElementById("test"));
			},
			error:function(a,b,c){
				alert("数据获取失败");
			}
		});
	},
	/*
	* 博客model
	*/
	blogModel:function(data){
		var blogSelf=this;
		ko.mapping.fromJS(data,{},blogSelf);
	},

	//获取博客数据
	getBlogList:function(){
		$.ajax({
			url:"/list",
			type:"post",
			dataType:"json",
			success:function(data){
				if(data.flag){
					ko.applyBindings(new indexDo.blogModel(data),document.getElementById("bloglist"));
				}
			},
			error:function(a,b,c){
				alert("数据获取失败");
			}
		});
	},
	//顶部的Model
	_headerModel:function(data){
		var headSelf=this;
		headSelf.openSearch=function(){
			return function(){
				if($(".button-search").width()>60){
					$(".button-search").stop().animate({"width":"60px"});
				}else{
					$(".button-menu").stop().animate({"width":"60px"});
					$(".button-search").stop().animate({"width":"300px"});
				}
			};
		};
		headSelf.popHanson=function(){
			return function(){
				alert("I am Hanson")
			};
		};
		headSelf.openMenu=function(){
			return function(){
				if($(".button-menu").width()>60){
					$(".button-menu").stop().animate({"width":"60px"});
				}else{
					$(".button-search").stop().animate({"width":"60px"});
					$(".button-menu").stop().animate({"width":"300px"});
				}
			};
		}
	},
	//顶部的操作
	headerOperate:function(data){
		ko.applyBindings(new indexDo._headerModel([]),document.getElementById("header_bind"));
	}
}

$(function(){
	//获取网站配置信息
	indexDo.getSiteSetting();
	indexDo.getBlogList();
	indexDo.headerOperate();
});