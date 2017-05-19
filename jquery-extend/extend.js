$(function(){
	$.extend({
	    sayHello: function(name) {
	        console.log('Hello,' + (name ? name : 'Dude') + '!');
	    }
	});

	/*$.fn.myPlugin = function() {
	    //在这里面,this指的是用jQuery选中的元素
	    //example :$('a'),则this=$('a')
	    this.css('color', 'red');
	}*/

	/*$.fn.myPlugin = function() {
	    //在这里面,this指的是用jQuery选中的元素
	    this.css('color', 'red');
	    return this.each(function() {
	        //对每个元素进行操作
	        $(this).append(' ' + $(this).attr('href'));
	    });
	}*/

	$.fn.myPlugin = function(options) {
	    var defaults = {
	        'color': 'red',
	        'fontSize': '12px'
	    };
	    //var settings = $.extend(defaults, options);
	    var settings = $.extend({},defaults, options);//将一个空对象做为第一个参数
	    //debugger;
	    console.log(defaults);
	    return this.css({
	        'color': settings.color,
	        'fontSize': settings.fontSize
	    });
	}

	//定义Beautifier的构造函数
	var Beautifier = function(ele, opt) {
	    this.$element = ele,
	    this.defaults = {
	        'color': 'red',
	        'fontSize': '12px',
	        'textDecoration':'none'
	    },
	    this.options = $.extend({}, this.defaults, opt)
	}
	//定义Beautifier的方法
	Beautifier.prototype = {
	    beautify: function() {
	        return this.$element.css({
	            'color': this.options.color,
	            'fontSize': this.options.fontSize,
	            'textDecoration': this.options.textDecoration
	        });
	    }
	}
	//在插件中使用Beautifier对象
	$.fn.myPlugin = function(options) {
	    //创建Beautifier的实体
	    var beautifier = new Beautifier(this, options);
	    //调用其方法
	    return beautifier.beautify();
	}

$.sayHello(); //调用
$.sayHello('Wayou'); //带参调用

//$('a').myPlugin().css('font-size', '20px');

/*$('a').myPlugin({
    'color': '#2C9929'
});

$('#a').myPlugin({});*/

$('a').myPlugin({
        'color': '#2C9929',
        'fontSize': '20px',
        'textDecoration': 'underline'
    });

});