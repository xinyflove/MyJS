$(document).ready(function(){
	$("#demosMenu").change(function(){
		console.log($(this));
	  //window.location.href = $(this).find("option:selected").attr("id") + '.html';
	});
});