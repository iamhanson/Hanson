//首页模块
define(['jquery','tmpl','knockout','komapping','/script/framework/model/commonmodel.js'],
	function($,tmpl,ko,komapping,hello){
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
		}
		/*
		* 首页的viewModel
		*/
		var _detailModel=function(){
			var self=this;
			//引入公用的模板
			new hello.headModel(self);
			_getSiteSetting(function(data){
				ko.mapping.fromJS(data, {}, self); 
			});

			self.selectMenu=function(category){
				return function(){
					sessionStorage.setItem("category",category);
					window.location.href="../../";
				}
			};
		};
		return function(){
			//初始化VIEWMODEL
			ko.applyBindings(new _detailModel(),document.getElementById("blog_detail"));
		}
	});