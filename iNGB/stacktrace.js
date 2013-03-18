/*!
 * iNGB Framework Stacktrace
 *   堆栈跟踪系统，需要和堆栈跟踪服务器配合
 * @author yangwj@ipanel.cn
 * @version v1.0
 ***/
(function(win, $){

/**
 * 静态开关
 ***/
var on = true,

/**
 * 堆栈跟踪服务器地址
 ***/	
	service = "http://localhost:48178/";	//例如，http://196.168.12.34/stacktrace/

/**
 * 动态开关
 ***/
$.logOn = false;	//默认关闭
$.systemLogOn = false;	//默认关闭
$.errorOn = true;

/**
 * 内部POST方法，避免依赖
 ***/
var post = function(params) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', service, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
};

if(on){

	/**
	 * $.log(str)
	 * 打印str
	 ***/
	$.log = function(str){
		str = "[UI LOG] " + str;
		$.logOn && post("log=" + encodeURI(str));
	}

	/**
	 * $._log(str)
	 * 内部专用打印，不建议外部使用
	 ***/
	$._log = function(str){
		str = "[iNGB Framework] " + str;
		$.logOn && $.systemLogOn && post("log=" + encodeURI(str));
	}

}


/**
 * 绑定错误收集器
 ***/
win.onerror = function(msg, url, line){
	var params = "url=" + url +
      "&msg=" + msg +
      "&line=" + line;

	post(params);
}

})(window, $);