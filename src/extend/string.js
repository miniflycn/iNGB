(function($){
	
$.string = {
	addZero: function(__str, __num){
		__str = __str.toString();
		for(var i = __str.length; i < __num; i++){
			__str = "0"+__str;
		}
		return __str;
	},
		
	getDuration: function(__t1, __t2){
		var t1 = __t1.split(":");
		var t2 = __t2.split(":");
		var duration = 0;
		duration = (Math.floor(t2[0])*60+Math.floor(t2[1])) - (Math.floor(t1[0])*60+Math.floor(t1[1]));
		if(t1[0] > t2[0]) duration = duration + 1440;
		return duration;
	},
		
	millisecondToMinute: function(__mili){			
		return parseInt((__mili/1000)/60);		
	},

	secondToStringTime: function(__sec){
		var hour = Math.floor(__sec/3600);
		var minute = Math.floor((__sec - hour*3600)/60);
		var second = __sec - hour*3600 - minute*60;
		hour = hour>9?hour:"0"+hour;
		minute = minute>9?minute:"0"+minute;
		second = second>9?second:"0"+second;
		return hour+":"+minute+":"+second;
	},
		
	getDisplayString: function(str,len){
		var totalLength=0;
		var toMarqueeFlag = false;
		var position=0;
		for(var i=0;i<str.length;i++){
			var intCode=str.charCodeAt(i);
			if(intCode>=0&&intCode<=128){
				totalLength+=1;//非中文单个字符长度加1
			}else{
				totalLength+=2;//中文字符长度则加2
			}
			if(totalLength > len){
				position = i;
				toMarqueeFlag = true;
				break;
			}
		}
		if(toMarqueeFlag)
			return str.substring(0,position);
			
		return "";
	}	
};

})($)