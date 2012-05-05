CREATE DATABASE  `vcom` ;

CREATE TABLE  `vcom`.`user` (
`id` INT NOT NULL AUTO_INCREMENT ,
`name` VARCHAR( 20 ) NOT NULL ,
`age` INT NOT NULL ,
`from` datetime NOT NULL ,
PRIMARY KEY (  `id` )
) ENGINE = MYISAM ;

USE DATABASE vcom;

INSERT INTO user('name', 'age')