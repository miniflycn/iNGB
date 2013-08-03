/**
 * Javscript动态模块加载器
 ***/
(function($){

	var doc = document,
		dist = (window.LIB_PATH || "dist").replace('/\/$/', ''),
		seed = {
			"EVENT": dist + "/event.min.js",			//事件映射
			"DATE": dist + "/date.min.js",				//日期显示
			"AJAX": dist + "/ajax.min.js",				//AJAX
			"MSG": dist + "/msg.min.js",				//消息通道
			"STRING": dist + "/string.min.js",			//字符串操作
			"LOG": dist + "/log.min.js",				//通用Log管理
			"AMD": dist + "/amd.min.js",				//AMD模块加载器
			"HANDLER": dist + "/handler.min.js",		//底层事件处理器
			"STACKTRACE": dist + "/stacktrace.min.js"	//堆栈跟踪模块
		};

	/**
	 * $.require(module, callback)
	 * 加载url的javascript
	 ***/
	$.require = function(module, callback){
		module = module.toUpperCase();
		if(!$[module]){
			var elem = doc.createElement("script");
			if(callback){
				elem.onload = function(){
					callback($, $[module.toLowerCase()]);
					elem.onload = function(){};
				};
			}
			elem.type = "text/javascript";
			elem.src = seed[module];
			doc.body.appendChild(elem);
			$._log("Module(" + module + ") has been loaded.");
		}else{
			callback && callback($, $[module.toLowerCase()]);
		}
	}

})($);