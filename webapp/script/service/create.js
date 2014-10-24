var edit={
	//发送文本内容
	_sendContent:function(category,tags,title,content,callBack){
		$.ajax({
			url:"/sendblog",
			type:"post",
			dataType:"json",
			data:{
				"title":title,
				"detail":content,
				"category":category,
				"tags":tags
			},
			success:function(data){
				callBack(data);
			},
			error:function(a,b,c){
				//alert("数据获取失败");
				//alert(2)
			}
		});
	},

	editModel:function(){
		var self=this;
		self.preview=ko.observable(false);

		self.previewText=ko.observable("预览");
		self.title=ko.observable("");
		self.detail=ko.observable("");
		self.category=ko.observableArray(["JavaScript","Css","html5","css3","NodeJs","Hanson"]);
		self.selectedCategory=ko.observableArray(["JavaScript"]);
		self.tags=ko.observableArray("");
		self.detailPreview=ko.observable("");
		//预览博客
		self.previewBlog=function(){
			return function(){
				if(self.preview()){
					self.preview(false);
					self.previewText("预览");
				}else{
					self.preview(true);
					self.previewText("编辑");
					self.detailPreview(marked(self.detail()));
				}
			};
		};
		//发布博客
		self.publishBlog=function(){
			return function(){
				if(self.selectedCategory().join(",").length>0&&self.tags().length>0&&self.title().length>0&&self.detail().length>0){
					
				}else{
					alert("不能为空");
					return;
				};
				edit._sendContent(self.selectedCategory(),self.tags().split(","),self.title(),self.detail(),function(data){
					self.preview(true);
					if(data.flag){
						self.detailPreview(data.data);
					}else{
						self.detailPreview(data.msg);
						alert(data.msg);
					}
				});
				
			};
		};
	}
};
$(function(){
	ko.applyBindings(new edit.editModel(),document.getElementById("blog_edit"));
});