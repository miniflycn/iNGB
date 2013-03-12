/*!
 * iNGB Framework Event
 *   1、负责按键事件与系统事件映射
 *   2、使得映射可以动态修改管理
 * @author yangwj@ipanel.cn
 * @version v1.0
 ***/

(function($){

/**
 * 按键事件映射
 ***/
var KeyEvent = {
	4106: {
		code: "KEY_STANDBY"
	},
	33: {
		code: "KEY_PAGE_UP"
	},
	34: {
		code: "KEY_PAGE_DOWN"
	},
	4098: {
		code: "KEY_HOMEPAGE"
	},
	4097: {
		code: "KEY_MENU"
	},
	4192: {
		code: "KEY_EPG"
	},
	4099: {
		code: "KEY_HELP"
	},
	4211: {
		code: "KEY_VOD"
	},
	4212: {
		code: "KEY_NVOD"
	},
	4218: {
		code: "KEY_STOCK"
	},
	4217: {
		code: "KEY_MAIL"
	},
	4196: {
		code: "KEY_BROADCAST"
	},
	4209: {
		code: "KEY_TV"
	},
	4210: {
		code: "KEY_AUDIO"
	},
	4100: {
		code: "KEY_INFO"
	},
	4102: {
		code: "KEY_FAVORITE"
	},
	4109: {
		code: "KEY_VOLUME_UP"
	},
	4110: {
		code: "KEY_VOLUME_DOWN"
	},
	4111: {
		code: "KEY_CHANNEL_UP"
	},
	4112: {
		code: "KEY_CHANNEL_DOWN"
	},
	4104: {
		code: "KEY_AUDIO_MODE"
	},
	112: {
		code: "KEY_F1"
	},
	113: {
		code: "KEY_F2"
	},
	114: {
		code: "KEY_F3"
	},
	115: {
		code: "KEY_F4"
	},
	2305: {
		code: "KEY_RED"
	},
	2306: {
		code: "KEY_GREEN"
	},
	2307: {
		code: "KEY_YELLOW"
	},
	2308: {
		code: "KEY_BLUE"
	},
	4117: {
		code: "KEY_SWITCH"
	},
	4232: {
		code: "KEY_STATUS"
	},
	4168: {
		code: "KEY_BACKWARD"
	},
	4167: {
		code: "KEY_FORWARD"
	}
};

/**
 * 系统事件映射
 ***/
var SystemEvent = {
	
};

/**
 * $.extend(target, object)
 * 将object的属性添加到target上
 ***/
$.extend = function(target, object){
	var i;
	for(i in object){
		target[i] = object[i];
	}
};

$.extend($.KeyEvent, KeyEvent);
$.extend($.SystemEvent, SystemEvent);
	
})($);