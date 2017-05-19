<?php
include_once("connect.php");

$query = mysql_query("select pic from photobooth order by id desc limit 50");
$arr = '';
while($row=mysql_fetch_array($query)){
	$arr[] = array(
	   'pic' => $row['pic']
    );
}
echo json_encode($arr);
?>