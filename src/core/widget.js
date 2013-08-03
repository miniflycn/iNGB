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
				this.iframe.zIndex = "999";
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

	/**
	 * $.mainFrame.gotoApp(url)
	 * 当App没有任何真焦点时候，使用该接口
	 ***/
	$.mainFrame.gotoApp = function(url){
		if(this.win){
			$.removeHandler(this.win.__.handler);
		}
			
		var that = this;
			
		this.iframe.onload = initPage;
		this.iframe.src = url;
			
		function initPage(){
		
			if(this.src.indexOf("http://") === -1){
				back2UI();
			}
		
			that.doc = that.iframe.contentDocument;
			that.win = that.iframe.contentWindow;
				
			$._log("Widget[" + that.name + "] url == " + url);
		}
		
		function back2UI(){
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
	};

	/**
	 * $.mainFrame.gotoApp2(url)
	 * 当App有假焦点时
	 ***/
	$.mainFrame.gotoApp2 = function(url){
		if(this.win){
			$.removeHandler(this.win.__.handler);
		}
		
		var that = this;
		
		this.iframe.onload = initPage;
		this.iframe.src = url;

		function initPage(){

			if(this.src.indexOf("http://") === -1){
				back2UI();
				return;
			}
			
			that.doc = that.iframe.contentDocument;
			that.win = that.iframe.contentWindow;
				
			$._log("Widget[" + that.name + "] url == " + url);
			
			$.watcher(that.doc, "onkeydown", watcherEvent);
			$.watcher(that.doc, "onsystemevent", watcherEvent);
			
			function watcherEvent(prop){
				var tmp = that.doc[prop];
				that.doc[prop] = function(e){
					var code;
					if((code = prop === "onkeydown" ? $.KeyEvent[e.which] : $.SystemEvent[e.which])){
						if(!eventManager(code, (prop === "onkeydown" ? 1 : 2), e.modifiers)){
							return 0;
						}
					}
					tmp(e);
				};
			}
		}
		
		function back2UI(){
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
		
	};

})($);