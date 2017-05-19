<?php
$upload_limit = array(
	'size' => 0,
	'type' => array()
	);

$msg = '';
$is_refile = 0;
$upload_path = 'upload';
$file = $_FILES["file"];
$file_name = $file['name'];
//var_dump($file);die;
if( !$file["error"] )
{
	// 上传限制
	if( $upload_limit['size'] > 0 )
	{
		// 文件大小
		if( $file["size"] < $upload_limit['size'] )
		{
			$size = $upload_limit['size']/1024;
			$msg = '上传文件大小不超过'.$size.'Kb';
			msg(0, $msg);
			return;
		}

		// 文件类型
		if( !empty($upload_limit['type']) )
		{
			if( !in_array($file["type"], $upload_limit['type']))
			{
				$ext = array();
				foreach ($upload_limit['type'] as $value) {
					$type = explode('/', $value);
					$ext[] = $type[1];
				}
				$msg = '上传文件类型为'.implode(',', $ext);
				msg(0, $msg);
				return;
			}
		}
	}

	if( !$is_refile )
	{
		// 文件存在
		if ( file_exists($upload_path.'/'.$file_name) )
		{
			$msg = '文件已存在';
			msg(0, $msg);
			return;
		}
	}

	$res = move_uploaded_file($file["tmp_name"], $upload_path.'/'.$file_name);
	if( $res )
	{
		$msg = '文件长传成功';
		msg(1, $msg);
		return;
	}
}

$msg = '文件长传失败';
msg(0, $msg);

function msg($code, $msg)
{
	echo json_encode(array('code'=>$code, 'msg'=>$msg));
}