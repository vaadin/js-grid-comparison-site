var Whenever = function Whenever() {
	var callbacks = [];
	var _ready = false;
	var args;
	return {
		get state() {
			return {
				ready: _ready,
				args: args,
				pendingCallbacks: callbacks.length
			};
		},
		ready: function ready() {
			args = arguments;
			callbacks.forEach(function (callback) {
				callback.apply(this, args);
			});
			callbacks = [];
			_ready = true;
		},
		whenReady: function whenReady(callback) {
			if (_ready) {
				callback.apply(this, args);
			} else {
				callbacks.push(callback);
			}
		}
	};
};