
//首页模块
define(['jquery','knockout','komapping','/script/framework/model/commonmodel.js'],function($,ko,komapping,hello){

	ko.mapping = komapping;
	/*
	* 获取系统的设置
	* @param callBack 获取数据后的回调函数
	*/
	var _getSiteSetting=function(callBack){
		$.ajax({
			url:"/settings",
			type:"post",
			dataType:"json",
			success:function(data){
				callBack(data);
			},
			error:function(a,b,c){
				alert("数据获取失败");
			}
		});
	};

	/*
	* 获取博客数据
	* @param category 类型
	* @param callBack 获取数据后的回调函数
	*/
	var _getBlogList=function(category,callBack){
		if(!category){
			category=sessionStorage.getItem("category")||"";
			sessionStorage.removeItem("category");
		}
		$.ajax({
			url:"/list",
			type:"post",
			dataType:"json",
			data:{"category":category},
			success:function(data){
				if(data.flag){
					callBack(data);
				}
			},
			error:function(a,b,c){
				alert("数据获取失败");
			}
		});
	};
	
	
	//* 首页的viewModel
	
	var _indexModel=function(){
		var self=this;
		//引入公用的模板
		new hello.headModel(self);
		self.loading=ko.observable(true);
		_getSiteSetting(function(data){
			ko.mapping.fromJS(data, {}, self); 
			self.loading(false);
		});
		_getBlogList("",function(data){
			ko.mapping.fromJS(data, {}, self); 
		});
		self.selectMenu=function(obj){
			return function(){
				_getBlogList(obj,function(data){
					ko.mapping.fromJS(data, {}, self); 
				});
				$("#menu_button").trigger("click");
			}
		};
	};
	var load=function(){
		ko.applyBindings(new _indexModel(),document.getElementById("blog_index"));
	};
	return {
		load:load
	}
});