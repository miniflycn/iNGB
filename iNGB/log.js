/*!
 * iNGB Framework Log
 *   用于管理Log
 * @author yangwj@ipanel.cn
 * @version v1.0
 ***/
(function($){

/**
 * 静态开关
 ***/
var on = true;

/**
 * 动态开关
 ***/
$.logOn = true;
$.systemLogOn = true;


var log;
 
if(on){
	if(window.Utility && Utility.println){
		log = function(str){
			$.logOn && Utility.println(str);
		}
	}else if(window.console && console.log){
		log = function(str){
			$.logOn && console.log(str);
		};
	}
}else{
	log = function(){};
}

/**
 * $.log(str)
 * 打印str
 ***/
$.log = function(str){
	str = "[UI LOG] " + str;
	log(str);
}

/**
 * $._log(str)
 * 内部专用打印，不建议外部使用
 ***/
$._log = function(str){
	str = "[iNGB Framework] " + str;
	$.systemLogOn && log(str);
}

})($);