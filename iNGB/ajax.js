/*!
 * iNGB Framework Ajax
 *   用于简化Ajax操作
 * @author official@justany.net
 * @version v1.0
 ***/
(function($){

$.ajax = {};

/**
 * $.ajax.request(url, options, type)
 * Ajax基础方法
 ***/
$.ajax.request = function(url, options, type){
	var async = options.async || true,
		username = options.username || "",
		password = options.password || "",
		data = options.data || "",
		method = (options.method || "GET").toUpperCase(),
		headers = options.headers || {},
		eventHandler = {},
		dataType = type || "string";
	
	function stateChangeHandler(){
		if(xhr.readyState == 4){
			var sta = xhr.status;
			if(sta == 200 || sta == 304){
				fire("success");
			}else{
				fire("failure");
			}
		
			window.setTimeout(function(){
				xhr.onreadystatechange= new Function();
				if (async){
					xhr = null;
				}
			},0);
		}
	}
	
	function fire(type){
		type = "on" + type;
		var handler = eventHandler[type];
		if(handler){
			if(type != "onsuccess"){
				handler(xhr);
			}else{
				handler(xhr, dataType != "xml" ? xhr.responseText : xhr.responseXML);
			}
		}
	}
	
	for(var key in options){
		eventHandler[key] = options[key];
	}
	
	var xhr = new XMLHttpRequest();
	if(method == "GET"){
		url += (url.indexOf("?") >= 0) ? "&" : "?";
		url += data;
		data = null;
	}
	if (async){
		xhr.onreadystatechange = stateChangeHandler;
	}
	if(username){
		xhr.open(method,url,async,username,passowrd);
	}else{
		xhr.open(method,url,async);
	}
	if(method == "POST"){
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	for(var key in headers){
		xhr.setRequestHeader(name,headers[key])
	}
	fire("beforerequest");
	xhr.send(data);
	
	
	if (!async){
		stateChangeHandler();
	}

	return xhr;
}

/**
 * $.ajax.post(url, data, onsuccess)
 * POST方法
 ***/
$.ajax.post = function(url, data, onsuccess){
	return ajax.request(url, {"data": data, "onsuccess": onsuccess, method: "POST"});
}

/**
 * $.ajax.get(url, data, onsuccess)
 * $.ajax.get(url, onsuccess)
 * GET方法
 ***/
$.ajax.get = function(url, data, onsuccess){
	if(!onsuccess){
		onsuccess = data;
		data = null;
	}
	return ajax.request(url, {"data": data, "onsuccess": onsuccess});
}

})($);