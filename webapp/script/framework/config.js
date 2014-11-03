require.config({
	//配置路径
	paths: {
		'jquery':'/script/lib/jquery-1.8.0.min',
		'knockout':'/script/lib/knockout-3.1.0',
		'komapping':'/script/lib/knockout.mapping',
		'tmpl':'/script/plugin/jquery.tmpl',
		'marked':'/script/plugin/marked/marked'
	},	
	shim: {
		tmpl:{
			deps:['jquery'],
			exports:'tmpl'
		},
		tmplKnock:{
			deps: ['tmpl'],
            exports: 'knockout'
		},
        komappqing: {
            deps: ['knockout'],
            exports: 'komapping'
        }
    }
});