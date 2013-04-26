<?php
include_once('sql.php');

function dispatch(){
	$func = $_GET['func'];

	$records = array();
	switch($func){
		case 'getRecords': $records = getRecords(); break;
		case 'getRecord': $records = getRecord(); break;
		case 'addRecord': addRecord(); break;
		case 'updateRecord': updateRecord(); break;
		case 'delRecord': delRecord(); break;
	}

	echo json_encode($records);
}

dispatch();
exit;

function getRecords(){
	$db = new Db();
	$pid = $_GET['pid'];
	return $db->get('SELECT * FROM wuzi WHERE pid='.$pid);
}

function getRecord(){
	$db = new Db();
	$id = $_GET['id'];
    $records = $db->get('SELECT * FROM wuzi WHERE id='.$id);
	return $records[0];
}

function addRecord(){
	$db = new Db();
	return $db->get(sprintf("INSERT INTO  `wuzi` (`addr` ,`water` ,`tent` ,`lamp` ,`medm` ,`drug` ,`quilt` ,`cloth` ,`com` ,
		`child` ,`trans` ,`other` ,`pid`) VALUES ('%s',  %s,  %s,  %s,  %s,  %s,  %s,  %s,  %s,  %s,  %s,  %s, %s);",
		$_GET['addr'],$_GET['water'],$_GET['tent'],$_GET['lamp'],$_GET['medm'],$_GET['drug'],
		$_GET['quilt'],$_GET['cloth'],$_GET['com'],$_GET['child'],$_GET['trans'],$_GET['other'],$_GET['pid']
	));
}

function updateRecord(){
	$db = new Db();
	return $db->get(sprintf("UPDATE `wuzi` SET `addr`='%s',`water`=%s,`tent`=%s,`lamp`=%s,`medm`=%s,`drug`=%s,`quilt`=%s,
	`cloth`=%s,`com`=%s,`child`=%s,`trans`=%s,`other`=%s WHERE id=%s",
		$_GET['addr'],$_GET['water'],$_GET['tent'],$_GET['lamp'],$_GET['medm'],$_GET['drug'],
		$_GET['quilt'],$_GET['cloth'],$_GET['com'],$_GET['child'],$_GET['trans'],$_GET['other'],$_GET['id']
	));
}

function delRecord(){
	$db = new Db();
	$id = $_GET['id'];
	return $db->exec('DELETE FROM `wuzi` WHERE id='.$id);
}

/*

*/
?>