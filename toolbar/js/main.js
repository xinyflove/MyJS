require.config({
	paths: {
		jquery: 'jquery.min',
	}
});

requirejs(['jquery', 'backtop', 'validate'], function($, backtop, validates) {
	
	$('#backTop').backtop({
		mode: 'move'
	});
});