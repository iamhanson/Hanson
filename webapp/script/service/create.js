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
				"tags":tags,
				"id":$("#has_id").val()
			},
			success:function(data){
				callBack(data);
			},
			error:function(a,b,c){
				//
			}
		});
	},
	/*
	* 获取存在的博客进行编辑
	* @param blogId博客id
	* @param callBack 回调
	*/
	_getExistBlog:function(blogId,callBack){
		$.ajax({
			url:"/blogs",
			type:"post",
			data:{id:blogId+""},
			dataType:"json",
			success:function(data){
				if(data.flag){
					callBack(data.data);
				}else{
					callBack([]);
				}
			},
			error:function(a,b,c){
				debugger
			}
		});
	},
	editModel:function(){
		var self=this;
		self.preview=ko.observable(false);
		self.previewText=ko.observable("预览");
		self.title=ko.observable("");
		self.detail=ko.observable("");
		self.blogCategory=ko.observableArray(["JavaScript","Css","html5","css3","NodeJs","Hanson"]);
		self.category=ko.observableArray(["JavaScript"]);
		self.tags=ko.observableArray("");
		self.detailPreview=ko.observable("");
		edit._getExistBlog($("#has_id").val(),function(data){
			ko.mapping.fromJS(data, {}, self); 
		});
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
				var tags=[];
				if(typeof self.tags()=="object"){
					tags=self.tags();
				}else{
					tags=self.tags().split(",");
				}
				if(self.selectedCategory().join(",").length>0&&self.tags().length>0&&self.title().length>0&&self.detail().length>0){
					
				}else{
					alert("不能为空");
					return;
				};
				edit._sendContent(self.selectedCategory(),tags,self.title(),self.detail(),function(data){
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