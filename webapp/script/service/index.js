/*
* 首页模块
* Hanson
* 2014-10-1
*/
var indexDo={
	/*
	* 首页的viewModel
	*/
	indexModel:function(){
		var self=this;
		new headModel(self);
		indexDo.getSiteSetting(function(data){
			ko.mapping.fromJS(data, {}, self); 
		});
		indexDo.getBlogList("",function(data){
			ko.mapping.fromJS(data, {}, self); 
		});
		self.selectMenu=function(obj){
			return function(){
				indexDo.getBlogList(obj,function(data){
					ko.mapping.fromJS(data, {}, self); 
				});
			}
		};
	},
	
	/*
	* 获取系统的设置
	* @param callBack 获取数据后的回调函数
	*/
	getSiteSetting:function(callBack){
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
	},

	/*
	* 获取博客数据
	* @param category 类型
	* @param callBack 获取数据后的回调函数
	*/
	getBlogList:function(category,callBack){
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
	}
}

$(function(){
	//初始化VIEWMODEL
	ko.applyBindings(new indexDo.indexModel(),document.getElementById("blog_index"));
});