(function() {
    
var upload_bar = $('.upload_bar');
var upload_percent = $('.upload_percent');
//var upload_status = $('#upload_status');
   
$('#demo1').ajaxForm({
    beforeSend: function() {
        /*提交前*/
        console.log('log1');
    },
    uploadProgress: function(event, position, total, upload_percentComplete) {
        /*上传过程中,如果有文件上传,则触发此方法.*/
        console.log('log2-1', upload_percentComplete);
    },
    success: function() {
        /*提交成功*/
        console.log('log3');
    },
    complete: function(xhr) {
        /*提交完成*/
        console.log('log4-1', xhr.status);  /*状态码:200->成功*/
        console.log('log4-2', xhr.responseText);    /*服务器返回的数据*/
    }
});

$('#demo2').ajaxForm({
    beforeSend: function() {
        if($("#file").val() === '') {
            alert('请选择文件');
            return false;
        }
        //upload_status.empty();
        var upload_percentVal = '0%';
        upload_bar.width(upload_percentVal)
        upload_percent.html(upload_percentVal);
    },
    uploadProgress: function(event, position, total, upload_percentComplete) {
        
        var upload_percentVal = upload_percentComplete + '%';
        upload_bar.width(upload_percentVal)
        upload_percent.html(upload_percentVal);
    },
    success: function() {
        
        var upload_percentVal = '100%';
        upload_bar.width(upload_percentVal)
        upload_percent.html(upload_percentVal);
    },
    complete: function(xhr) {
        
        //upload_status.html(xhr.responseText);
        res = eval("("+xhr.responseText+")");
        art = $(".alert");
        if( res.code )
        {
            art.removeClass('alert-danger').addClass('alert-success');
        }
        else
        {
            art.removeClass('alert-success').addClass('alert-danger');
        }
        art.append(res.msg);
        art.show();
    }
});

})();