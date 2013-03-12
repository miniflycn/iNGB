﻿/*!
 * iNGB Framework Core
 *   1、简易版选择器
 *   2、widget创建管理
 *   3、三层事件架构
 *   4、动态脚本加载
 *   5、给widget绑定工具
 * @author yangwj@ipanel.cn
 * @version v1.0
 ***/

/**
 * debug管理
 ***/
(function(host){

var characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" )
	};

/**
 * 简易版ID、CLASS、TAG选择器
 */
var $ = function(context, selector){
	if(matchExpr["ID"].test(selector)){
		return context.getElementById(selector.replace("#", ""));
	}else if(matchExpr["CLASS"].test(selector)){
		return context.getElementsByClassName(slector.replace(".", ""));
	}else if(matchExpr["TAG"].test(selector)){
		return context.getElementsByTagName(selector);
	}
};

$.log = $._log = function(){};

host.$ = $;

})(this);

/**
 * Widget封装
 ***/
(function($){

var doc = document,
	widgetCache = {},
	widgetList = [],
	__widget = function(name){
		this.name = name;
		
		if(!widgetList.length){
			this.iframe = doc.createElement('iframe');
			doc.body.appendChild(this.iframe);
			this.iframe.style.position = "absolute";
			this.iframe.scrolling = "no";
			this.iframe.frameBorder = "no";
		}else{
			this.iframe = widgetList.shift();
		}
		
		$._log("Widget[" + name + "] has been created!");
	};

$.widgetCache = widgetCache;

/**
 * $.widget
 * widget工厂函数
 *
 ***/	
$.widget = function(name){
	if(name){
		return widgetCache[name] || (widgetCache[name] = new __widget(name));
	}else{
		return $.mainFrame;
	}
};
	
$.widget.prototype = __widget.prototype = {

	constructor: $.widget,
	
	/**
	 * widget.load(url)
	 * 载入页面
	 *
	 ***/	
	load: function(url){
		if(this.win){
			$.removeHandler(this.win.__.handler);
		}
		
		var that = this;
		
		this.iframe.onload = initPage;
		this.iframe.src = url;
		
		function initPage(){
			that.doc = that.iframe.contentDocument;
			that.win = that.iframe.contentWindow;
			that.win.__ = {
				handler : that.win.eventHandler || function(){},
				name: that.name
			};
			
			$._log("Widget[" + that.name + "] url == " + url);
			
			$.init(that.win, that.doc);
			
			that.iframe.onload = function(){};
			
			var tmp;
			
			(tmp = that.win.onReady) && tmp();
		}
	},
	
	/**
	 * widget.resize(width, height)
	 * 改变widget长宽
	 *
	 ***/
	resize: function(width, height){
		this.iframe.width = width + "";
		this.iframe.height = height + "";
	},
	
	/**
	 * widget.moveTo(x, y)
	 * 移动widget
	 *
	 ***/
	moveTo: function(x, y){
		this.iframe.style.left = x + "";
		this.iframe.style.top = y + "";
	},
	
	/**
	 * widget.minimize()
	 * 最小化widget
	 *
	 ***/
	minimize: function(){
		$.removeHandler(this.win.__.handler);
	
		this.iframe.style.display = "none";
	},
	
	/**
	 * widget.show()
	 * 显示widget
	 *
	 ***/
	show: function(){
		$.addHandler(this.win.__.handler);
	
		this.iframe.style.display = "block";
	},
	
	/**
	 * widget.level(num)
	 * 设置widget的显示层级
	 *
	 ***/
	level: function(num){
		this.iframe.style.zIndex = num + "";
	},
	
	/**
	 * widget.close()
	 * 关闭widget
	 *
	 ***/
	close: function(){
		$.removeHandler(this.win.__.handler);
		
		$._log("Widget[" + this.name + "] has been close!");
		delete widgetCache[this.name];
		widgetList.push(this.iframe);
	}
}

/**
 * $.mainFrame
 * 获取mainFrame
 *
 ***/
$.mainFrame = new __widget("mainFrame");
$.mainFrame.resize(1280, 720);
$.mainFrame.moveTo(0, 0);

})($);

/**
 * Javscript动态模块加载器
 ***/
(function($){

var doc = document,
	seed = {
		"EVENT": "iNGB/event.js",		//事件映射
		"DATE": "iNGB/date.js",			//日期显示
		"AJAX": "iNGB/ajax.js",			//AJAX
		"MSG": "iNGB/msg.js",			//消息通道
		"STRING": "iNGB/string.js",		//字符串操作
		"LOG": "iNGB/log.js",			//通用Log管理
		"AMD": "iNGB/amd.js",			//AMD模块加载器
		"HANDLER": "iNGB/handler.js"	//底层事件处理器
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

/*
 * 模拟三层结构
 ***/
(function($){

var widgetHandles = [],
	i,
	len;

function eventManager(event, type, p2){
	
	event.p2 = p2;
	
	/**
	 * event最后被组装成有下面几个属性
	 * @code 字符串映射
	 * @value 数字键的按键值
	 * @p2 常说的p2值
	 * @type 是否可以往下流
	 */
	
	if(len = widgetHandles.length){
		for(i = 0; i < len; i++){
			if(!widgetHandles[i](event, type)){
				$._log("The event(" + event.code + ") stop down flow in widget.");
				return;
			}
		}
	}
	if(!$.mainFrame.win.__.handler(event, type)){
		$._log("The event(" + event.code + ") stop down flow in mainFrame.");
		return;
	}
	eventHandler(event, type);
}

/**
 * 开机需要的按键事件包装类
 ***/
$.KeyEvent = {
	8: {
		code: "KEY_BACK"
	},
	13: {
		code: "KEY_SELECT"
	},
	27: {
		code: "KEY_EXIT", 
		type: 1
	},
	33: {
		code: "KEY_PAGE_UP"
	},
	34: {
		code: "KEY_PAGE_DOWN"
	},
	37: {
		code: "KEY_LEFT"
	},
	38: {
		code: "KEY_UP"
	},
	39: {
		code: "KEY_RIGHT"
	},
	40: {
		code: "KEY_DOWN"
	},
	4097: {
		code: "KEY_MENU"
	}
};

/**
 * 开机需要的系统事件包装类
 ***/
$.SystemEvent = {
	8280: {
		code: "DVB_STARTUP_FINISH"
	}
};

document.onkeydown = function(e){
	var code;
	if((code = $.KeyEvent[e.which])){
		eventManager(code, 1, e.modifiers);
	}
}
document.onsystemevent = function(e){
	var code;
	if((code = $.SystemEvent[e.which])){
		eventManager(code, 2, e.modifiers);
	}
}

/**
 * $.addHandler(handler)
 * 添加事件处理函数
 ***/
$.addHandler = function(handler){
	widgetHandles.push(handler);
}

/**
 * $.removeHandler(handler)
 * 删除事件处理函数
 ***/
$.removeHandler = function(handler){
	if((i = widgetHandles.indexOf(handler)) > -1){
		widgetHandles.splice(i, 1);
	}
}

/**
 * $.sendEvent(p1, p2, type)
 * 模拟法消息
 ***/
$.sendEvent = function(p1, p2, type){
	if(type === 1){
		eventManager(KeyEvent[p1], type, p2);
	}else if(type === 2){
		eventManager(SystemEvent[p1], type, p2);
	}
}

/**
 * $.init(currWindow, currDocument)
 * 页面初始化
 ***/
$.init = function(currWindow, currDocument){
	currWindow.$ = $;
	
	if(currWindow.__.name !== "mainFrame" && currWindow.__.handler){
		$.addHandler(currWindow.__.handler);
	}
	
	/**
	 * changeHandler(handler)
	 * 改变页面的事件处理器
	 ***/
	currWindow.changeHandler = function(handler){
		$.removeHandler(this.__.handler);
		$.addHandler(handler);
		this.__.handler = handler;
	};
	
	/**
	 * Q(selector)
	 * 简易选择器
	 ***/
	currWindow.Q = function(selector, context){
		return $(context || currDocument, selector);
	};
	
	/**
	 * require()
	 * AMD模块加载器
	 ***/
	currWindow.require = function(){
		$.amd.require ? $.amd.require.apply(this, arguments) : $._log("Module(AMD) must be loaded!");
	};
	
	/**
	 * define()
	 * AMD模块定义
	 ***/
	currWindow.define = function(){
		$.amd.define ? $.amd.define.apply(this, arguments) : $._log("Module(AMD) must be loaded!");
	};
}

})($);