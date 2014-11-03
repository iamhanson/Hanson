define(['jquery','knockout','komapping'],function($,ko,komapping){
	/*
	* 顶部公用的ko model
	* @param self 初始化的model自身
	*/
	var headModel = function(self){
		self.title=ko.observable("");
		self.category=ko.observableArray();
		self.data=ko.observableArray();
		self.backHome=function(){
			return function(){
				window.location.href="/";
			};
		};
		self.about=function(){
			return function(){
				alert("I am Hanson,success");
			};
		};
		self.openMenu=function(){
			return function(){
				if($("#slide_menu").hasClass("slide-menu-on")){
					$("#slide_menu").removeClass("slide-menu-on");
					$(".pop-cover").fadeOut();
					$(".main-content,#header_bind").stop().animate({"left":"0px"});
					$("#slide_menu").stop().animate({"left":"-201px"},function(){
						$("body").removeClass("body-oh");
						self.categoryOpen(false);
					});
				}else{
					$("#slide_menu").addClass("slide-menu-on");
					$(".pop-cover").unbind();
					$(".pop-cover").one("click",function(){
						$("#menu_button").trigger("click")
					});
					$("body").addClass("body-oh")
					$(".pop-cover").fadeIn();
					$(".main-content,#header_bind").stop().animate({"left":"201px"});
					$("#slide_menu").stop().animate({"left":"0px"});
				}
			};
		};

		self.categoryOpen=ko.observable(false);
		self.openCategory=function(){
			return function(){
				if(self.categoryOpen()){
					$("#category_list li").stop().animate({height:"0px"},function(){
						self.categoryOpen(false);
					});
				}else{
					self.categoryOpen(true);
					$("#category_list li").css({height:"0px"}).stop().animate({height:"45px"});
				}
			};
		};
	};
	return {
		headModel:headModel
	}
});
