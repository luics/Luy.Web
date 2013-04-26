<?php
	include_once 'sql.php';

	$db = new Db();
	//$link = $db->_conn();
	$db->exec("

CREATE TABLE `wuzi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addr` varchar(50) NOT NULL COMMENT '地域信息',
  `water` int(11) NOT NULL,
  `tent` int(11) NOT NULL,
  `lamp` int(11) NOT NULL,
  `medm` int(11) NOT NULL,
  `drug` int(11) NOT NULL,
  `quilt` int(11) NOT NULL,
  `cloth` int(11) NOT NULL,
  `com` int(11) NOT NULL,
  `child` int(11) NOT NULL,
  `trans` int(11) NOT NULL,
  `other` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pid` int(11) NOT NULL COMMENT '父级id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

		");
?>