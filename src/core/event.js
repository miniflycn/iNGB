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
				return 0;
			}
		}
	}
	if($.mainFrame.win.__ && !$.mainFrame.win.__.handler(event, type)){
		$._log("The event(" + event.code + ") stop down flow in mainFrame.");
		return 0;
	}
	window.eventHandler && eventHandler(event, type);
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
		if(!eventManager(code, 1, e.modifiers)){
			return 0;
		}
	}
	if(!$.mainFrame.__){
		var tmp = $.mainFrame.doc.onkeydown;
		if(typeof tmp === "function"){
			tmp(e);
		}
	}
};

document.onsystemevent = function(e){
	var code;
	if((code = $.SystemEvent[e.which])){
		if(!eventManager(code, 2, e.modifiers)){
			return 0;
		}
	}
	
	if(!$.mainFrame.__){
		var tmp = $.mainFrame.doc.onsystemevent;
		if(typeof tmp === "function"){
			tmp(e);
		}
	}
};

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
		$.removeHandler(currWindow.__.handler);
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