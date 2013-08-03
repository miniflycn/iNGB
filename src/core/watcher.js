/**
 * Watcher机制
 ***/
(function($){

	function defineGetAndSet(obj, propName, getter, setter) {
		try {
			Object.defineProperty(obj, propName, {
				get: getter,
				set: setter,
				enumerable: true,
				configurable: true
			});
		} catch(error) {
			try{
				Object.prototype.__defineGetter__.call(obj, propName, getter);
				Object.prototype.__defineSetter__.call(obj, propName, setter);
			}catch(error2){
				$._log("browser not supported.");
			}
		}
	}

	function watcher(obj, prop, watcher) {

		var val = obj[prop];

		var getter = function () {
			return val;
		};

		var setter = function (newval) {
			var oldval = val;
			val = newval;
			watcher(prop);
		};

		defineGetAndSet(obj, prop, getter, setter);

	};

	$.watcher = watcher;

})($);