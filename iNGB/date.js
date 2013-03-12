
(function($){

$.date = {
	format: function(d, formatter){
	    if(!formatter || formatter == ""){
	        formatter = "yyyy-MM-dd";
	    }
			
		var weekdays = {
			chi: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
			eng: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
		};
	    var year = d.getYear().toString();
	    var month = (d.getMonth() + 1).toString();
	    var date = d.getDate().toString();
	    var day = d.getDay();
		var hour = d.getHours().toString();
		var minute = d.getMinutes().toString();
		var second = d.getSeconds().toString();

		var yearMarker = formatter.replace(/[^y|Y]/g,'');
		if(yearMarker.length == 2){
			year = year.substring(2, 4);
		}else if(yearMarker.length == 0){
			year = "";
		}

		var monthMarker = formatter.replace(/[^M]/g,'');
		if(monthMarker.length > 1){
			if(month.length == 1){
				month = "0" + month;
			}
		}else if(monthMarker.length == 0){
			month = "";
		}

		var dateMarker = formatter.replace(/[^d]/g,'');
		if(dateMarker.length > 1){
			if(date.length == 1){
				date = "0" + date;
			}
		}else if(dateMarker.length == 0){
			date = "";
		}

		var hourMarker = formatter.replace(/[^h]/g, '');
		if(hourMarker.length > 1){
			if(hour.length == 1){
				hour = "0" + hour;
			}
		}else if(hourMarker.length == 0){
			hour = "";
		}

		var minuteMarker = formatter.replace(/[^m]/g, '');
		if(minuteMarker.length > 1){
			if(minute.length == 1){
				minute = "0" + minute;
			}
		}else if(minuteMarker.length == 0){
			minute = "";
		}

		var secondMarker = formatter.replace(/[^s]/g, '');
		if(secondMarker.length > 1){
			if(second.length == 1){
				second = "0" + second;
			}
		}else if(secondMarker.length == 0){
			second = "";
		}
		    
		//var lang = user.UILanguage;
		var dayMarker = formatter.replace(/[^w]/g, '');
		var curr_week = "";
		if(dayMarker.length > 0) curr_week = weekdays["chi"][day];
		//var lang = user.UILanguage;
		var result = formatter.replace(yearMarker,year).replace(monthMarker,month).replace(dateMarker,date).replace(hourMarker,hour).replace(minuteMarker,minute).replace(secondMarker,second).replace(dayMarker,curr_week);
		return result;
	},
        
    getDate: function(offset) {
        var d = new Date();
        var year = d.getYear();
        var month = d.getMonth();
        var date = d.getDate();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        
        var dd = new Date(year, month, (date + offset), hour, minute, second);
        return dd;
    },
		
	getCurrTimeInMinute: function(){
		var currTime = this.format(new Date(), "hh:mm");
		return parseInt(currTime.substring(0, 2), 10)*60 + parseInt(currTime.substring(3, 5), 10);
	}

};
	
})($);