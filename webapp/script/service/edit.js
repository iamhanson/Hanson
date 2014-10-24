var edit={
	editModel:function(){
		var self=this;
		self.data=ko.observableArray();
		self.deleteBlog=function(id){
			return  function(){
				if(window.confirm("确定删除么？")){
					edit.deleteBlog(id,function(){
						edit.getBlogList("",function(data){
							ko.mapping.fromJS(data, {}, self); 
						});
					});
				}
			};
		};
		edit.getBlogList("",function(data){
			ko.mapping.fromJS(data, {}, self); 
		});
	},

	/*
	* 删除博客
	* @param id 删除的id
	* @param callBack 成功删除后的回调
	*/
	deleteBlog:function(id,callBack){
		$.ajax({
			url:"./deleteblog",
			type:"post",
			data:{id:id},
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
			url:"./list",
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
};
$(function(){
	ko.applyBindings(new edit.editModel(),document.getElementById("blog_edit"));
});