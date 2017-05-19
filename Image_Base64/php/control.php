<?php

$data = array('code' => 0, 'msg' => '请选择图片');
if(!empty($_FILES["file"]))
{
    $file_path = "../images/" . $_FILES["file"]["name"];
    move_uploaded_file($_FILES["file"]["tmp_name"], $file_path);
    

    $type=getimagesize($file_path);//取得图片的大小，类型等
    $file_content = base64_encode(file_get_contents($file_path));
    
    switch($type[2])
    {
        //判读图片类型
        case 1:$img_type="gif";break;
        case 2:$img_type="jpg";break;
        case 3:$img_type="png";break;
    }

    $img='data:image/'.$img_type.';base64,'.$file_content;//合成图片的base64编码

    $data = array('code' => 1, 'msg' => $img, 'base64' => $file_content, 'width' => $type[0].'px', 'height' => $type[1].'px');

    unlink($file_path);
}

echo json_encode($data);
?>