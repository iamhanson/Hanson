/*
* 首页模块
* Hanson
* 2014-10-1
*/
var detaiDo={

	/*
	* 首页的viewModel
	*/
	detailModel:function(){
		var self=this;
		new headModel(self);
		self.selectMenu=function(obj){
			return function(){
				detaiDo.getBlogList(obj,function(data){
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

}

$(function(){
	//初始化VIEWMODEL
	ko.applyBindings(new detaiDo.detailModel(),document.getElementById("blog_detail"));
});