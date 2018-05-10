<?php
include_once('connect.php'); //连接数据库

$action = empty($_GET['action']) ? '' : $_GET['action'];
$arr = array('code' => 0, 'data' => array());

if($action=="start")
{
	//读取数据，返回json
	$ret = $db->query("SELECT * FROM member WHERE status=0");
	$i = 0;
	while($row = $ret->fetchArray(SQLITE3_ASSOC))
	{
		$i++;
		$arr['data'][] = array(
			'id' => $row['id'],
			'mobile' => substr($row['mobile'],0,3)."****".substr($row['mobile'],-4,4)
		);
	}
	if($i) $arr['code'] = 1;
	echo json_encode($arr);
}
elseif($action=="stop")
{
	//标识中奖号码
	$id = $_POST['id'];
	$sql = "UPDATE member SET status=1 WHERE id=$id";
	$ret = $db->exec($sql);
	if($ret)
	{
		$arr['code'] = 1;
	}
	echo json_encode($arr);
}
elseif($action=="reset")
{
	//重置
	$sql = "UPDATE member SET status=0";
	$ret = $db->exec($sql);
	if($ret)
	{
		$arr['code'] = 1;
	}
	echo json_encode($arr);
}
else
{
	// 
}