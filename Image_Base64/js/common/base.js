$(function(){

	var options = {
	    //target:        '#output2',   // target element(s) to be updated with server response
	    //beforeSubmit:  showRequest,  // pre-submit callback
	    success:       showResponse,  // post-submit callback

	    // other available options:
	    //url:       url         // override for form's 'action' attribute
	    //type:      type        // 'get' or 'post', override for form's 'method' attribute
	    dataType:  'json'        // 'xml', 'script', or 'json' (expected server response type)
	    //clearForm: true        // clear all form fields after successful submit
	    //resetForm: true        // reset the form after successful submit

	    // $.ajax options can be used here too, for example:
	    //timeout:   3000
	};

	// bind to the form's submit event
	$('#fromId').submit(function() {
	    // inside event callbacks 'this' is the DOM element so we first
	    // wrap it in a jQuery object and then invoke ajaxSubmit
	    $(this).ajaxSubmit(options);

	    // !!! Important !!!
	    // always return false to prevent standard browser submit and page navigation
	    return false;
	});
    
    $("#cleanBtn").click(function(){
    	$("#show").text('');
    });

    // 定义一个新的复制对象
    var clip = new ZeroClipboard( document.getElementById("d_clip_button"), {
      moviePath: "flash/ZeroClipboard.swf"
    } );

    // 复制内容到剪贴板成功后的操作
    clip.on( 'complete', function(client, args) {
       alert("复制成功");
    } );
});

function showResponse(data, status)
{
	if(status == 'success')
	{
		if(data.code)
		{
			$("#show").text(data.base64);
			$("#imgId").attr('src', data.msg);
			$("#imgId").attr('width', data.width);
			$("#imgId").attr('height', data.height);
			$(".showpic").show();
		}
		else
		{
			alert(data.msg)
		}
		//console.log(data.code);
	}
}