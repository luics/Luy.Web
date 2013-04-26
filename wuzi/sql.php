<?php

class Db
{
     // const DB_HOST = 'localhost:3306';
     // const DB_USER  = 'root';
     // const DB_PWD = '123456';
     // const DB_NAME = 'wuzi';

     const DB_HOST = 'localhost:3306';
     const DB_USER  = 'root';
     const DB_PWD = 'YOUxiu9(';
     const DB_NAME = 'site_wuzihuzhu';
    /* ['dbhost'] = 'localhost';
['dbuser'] = 'root';
['dbpw'] = '';
['dbcharset'] = 'utf8';*/

    private $link;

    function Db(){

    }

    function _conn() {
        $this->link = mysql_connect(self::DB_HOST, self::DB_USER, self::DB_PWD);
        if (!$this->link) {
            die('Could not connect: ' . mysql_error());
        }

        if (!mysql_select_db(self::DB_NAME, $this->link)) {
            die('Could not select database');
        }

        return $this->link;
    }

    function get($sql){
        $this->_conn();

        $result = mysql_query($sql, $this->link);

        if (!$result) {
            echo "DB Error, could not query the database\n";
            echo 'MySQL Error: ' . mysql_error();
            exit;
        }

        $records = array();
        $i=0;
        while($row=mysql_fetch_assoc($result)){
            $records[$i++] = $row;
        }

        mysql_close($this->link);

        return $records;
    }


    function exec($sql){
        $this->_conn();

        $result = mysql_query($sql, $this->link);

        if (!$result) {
            echo "DB Error, could not query the database\n";
            echo 'MySQL Error: ' . mysql_error();
            exit;
        }

        mysql_close($this->link);

        return $records;
    }
}

?>