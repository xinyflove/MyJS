// 定义模块
define(['jquery'], function($){
	
	// 构造函数
	function ScrollTo(opts){
		// 将用户传递的参数覆盖原来的ScrollTo.DEFAULTS，以"{}"形式返回
		this.opts = $.extend({}, ScrollTo.DEFAULTS, opts);
		this.$el = $('html, body');

	}

	ScrollTo.prototype.move = function(){
		var opts = this.opts,
			dest = opts.dest;
			
		if($(window).scrollTop() != dest){
			if(!this.$el.is(':animated')){
				console.log('log', 1);
				this.$el.animate({
					scrollTop: dest
				}, opts.speed);
			}
		}
	};

	ScrollTo.prototype.go = function(){
		var dest = this.opts.dest;

		if($(window).scrollTop != dest){
			this.$el.scrollTop(dest);
		}
	};


	ScrollTo.DEFAULTS = {
		dest: 0,
		speed: 800
	};

	return {
		ScrollTo: ScrollTo
	}
});