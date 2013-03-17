/*!
 * iNGB Framework Stacktrace
 *   ��ջ����ϵͳ����Ҫ�Ͷ�ջ���ٷ��������
 * @author yangwj@ipanel.cn
 * @version v1.0
 ***/
(function(win, $){

/**
 * ��̬����
 ***/
var on = true,

/**
 * ��ջ���ٷ�������ַ
 ***/	
	service = "";	//���磬http://196.168.12.34/stacktrace

/**
 * ��̬����
 ***/
$.logOn = true;
$.systemLogOn = true;
$.errorOn = true;

/**
 * �ڲ�POST��������������
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
	 * ��ӡstr
	 ***/
	$.log = function(str){
		str = "[UI LOG] " + str;
		$.logOn && post("log=" + encodeURI(str));
	}

	/**
	 * $._log(str)
	 * �ڲ�ר�ô�ӡ���������ⲿʹ��
	 ***/
	$._log = function(str){
		str = "[iNGB Framework] " + str;
		$.logOn && $.systemLogOn && post("log=" + encodeURI(str));
	}

}


/**
 * �󶨴����ռ���
 ***/
win.onerror = function(msg, url, line){
	var params = "url=" + url +
      "&msg=" + msg +
      "&line=" + line;

	post(params);
}

})(window, $);