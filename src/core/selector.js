/**
 * 选择器
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

	// 置空log方法
	$.log = $._log = function(){};
	
	host.$ = $;

})(this);