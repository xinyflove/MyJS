// 参考链接https://davidwalsh.name/browser-camera
var mediaStream = null,track = null,cxCanvas,cxVideo,ias;

/**
 * [打开相机]
 * @return {[type]} [description]
 */
function cxOpenCamera()
{
	$("#cxCanvas").hide();
	$("#cxSavePic").hide();
	$("#cxVideo").show();
	$("#cxSnap").show();

	try{
		//动态创建一个canvas元 ，并获取他2Dcontext。如果出现异常则表示不支持 
		document.createElement("canvas").getContext("2d");
		console.log('浏览器支持HTML5 canvas');
	}
	catch (e){
		console.log('浏览器不支持HTML5 canvas');
	}

	// Grab elements, create settings, etc.
	cxCanvas = document.getElementById('cxCanvas');
	cxVideo = document.getElementById('cxVideo');
	var mediaConfig =  { video: true };

	var errBack = function(e)
	{
		// 错误信息
		if(error.PERMISSION_DENIED)
		{
			cxTip('用户拒绝了浏览器请求媒体的权限', '提示');
		}
		else if(error.NOT_SUPPORTED_ERROR)
		{
			cxTip('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');
		}
		else if (error.MANDATORY_UNSATISFIED_ERROR)
		{
			cxTip('指定的媒体类型未接收到媒体流', '提示');
		}
		else
		{
			cxTip('系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试', '提示');
		}
	};

	// Put video listeners into place
	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
	{
		navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream){
			cxVideo.src = window.URL.createObjectURL(stream);
			cxVideo.play();
			mediaStream = stream;
			track = stream.getTracks()[0];
		});
	}
	/* Legacy code below! */
	else if(navigator.getUserMedia)
	{
		// Standard
		navigator.getUserMedia(mediaConfig, function(stream) {
			cxVideo.src = stream;
			cxVideo.play();
		}, errBack);
	}
	else if(navigator.webkitGetUserMedia)
	{
		// WebKit-prefixed
			navigator.webkitGetUserMedia(mediaConfig, function(stream){
			cxVideo.src = window.webkitURL.createObjectURL(stream);
			cxVideo.play();
		}, errBack);
	}
	else if(navigator.mozGetUserMedia)
	{
		// Mozilla-prefixed
		navigator.mozGetUserMedia(mediaConfig, function(stream){
			cxVideo.src = window.URL.createObjectURL(stream);
			cxVideo.play();
		}, errBack);
	}
	else
	{
		cxTip('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');
	}

	$(".cx-camera-bg").show();
	$(".cx-camera-box").show();
}

/**
 * [Trigger photo take]
 * @param  {[type]} t [description]
 * @return {[type]}   [description]
 */
function cxSnap(t)
{
	t = t || 0;
	var context = cxCanvas.getContext('2d');
	try {
		setTimeout(function () {
			context.drawImage(cxVideo, 0, 0, 480, 360);
			$("#cxVideo").hide();
			$("#cxCanvas").show();
			cstopMediaStream();
			cxCutPic();
		}, t);
	}
	catch (err) {
		cxTip(err);
	}

	$("#cxSavePic").show();
	$("#cxSnap").hide();
}

/**
 * [关闭相机页面]
 * @return {[type]} [description]
 */
function cxCloseCamera()
{
	cstopMediaStream();
	cxVideo.src = '';
	$(".cx-camera-bg").hide();
	$(".cx-camera-box").hide();
	// 取消切图功能
	ias.cancelSelection();
}

/**
 * [关闭摄像头]
 * @return {[type]} [description]
 */
function cstopMediaStream()
{
	if (mediaStream != null) {
	    if (mediaStream.stop) {
	        mediaStream.stop();
	    }
	}
	if (track != null) {
	    if (track.stop) {
	        track.stop();
	    }
	}
}

/**
 * [保存相片]
 * @return {[type]} [description]
 */
function cxSavePic()
{
	var image = new Image();
	image.src = document.getElementById("cxCanvas").toDataURL("image/png");
	//删除字符串前的提示信息“data:image/png;base64”
	var b64 = image.src.substring(22);

	var url = "action.php";
	var data = {
		b64: b64,
		cx_x1: $('input[name="cx_x1"]').val(),
		cx_y1: $('input[name="cx_y1"]').val(),
		cx_x2: $('input[name="cx_x2"]').val(),
		cx_y2: $('input[name="cx_y2"]').val(),
	}

	cxCloseCamera();

	$.post(url, data, function(res){
		if(res.code == 0)
		{
			// 保存成功
		}
		cxTip(res.msg);
	}, 'json');
}

/**
 * [裁剪功能]
 * @return {[type]} [description]
 */
function cxCutPic()
{
	var imgAreaSelectConfig = {
		aspectRatio: '3:4',
		minWidth: 120,
		minHeight: 160,
		x1: 180, y1: 100, x2: 300, y2: 260,
		handles: true,
		instance: true
	};
	ias = $('#cxCanvas').imgAreaSelect(imgAreaSelectConfig);

	$('#cxCanvas').imgAreaSelect({
        onInit: function (img, selection) {
        	$('input[name="cx_x1"]').val(selection.x1);
        	$('input[name="cx_y1"]').val(selection.y1);
        	$('input[name="cx_x2"]').val(selection.x2);
        	$('input[name="cx_y2"]').val(selection.y2);
        }
    });

	$('#cxCanvas').imgAreaSelect({
        onSelectEnd: function (img, selection) {
        	$('input[name="cx_x1"]').val(selection.x1);
        	$('input[name="cx_y1"]').val(selection.y1);
        	$('input[name="cx_x2"]').val(selection.x2);
        	$('input[name="cx_y2"]').val(selection.y2);
        }
    });
}

/**
 * [提示消息]
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
function cxTip(msg)
{
	alert(msg);
}