<?php

$pic_res = $_POST['b64'];
$pic_res = base64_decode($pic_res);
$src = imagecreatefromstring($pic_res);

//裁剪开区域左上角的点的坐标
$x = $_POST['cx_x1'];
$y = $_POST['cx_y1'];;
//裁剪区域的宽和高
$width = $_POST['cx_x2'] - $x;
$height = $_POST['cx_y2'] - $y;

$new_image = imagecreatetruecolor($width, $height);
imagecopyresampled($new_image, $src, 0, 0, $x, $y, $width, $height, $width, $height);
//输出图片
$path = '1.png';
imagepng( $new_image, $path );

imagedestroy($src);
imagedestroy($new_image);

echo json_encode(array('code'=>0, 'msg'=>'保存成功', 'filename'=>$path));