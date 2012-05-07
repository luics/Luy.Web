SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

DROP SCHEMA IF EXISTS `mblog` ;
CREATE SCHEMA IF NOT EXISTS `mblog` DEFAULT CHARACTER SET utf8 ;
USE `mblog` ;

-- -----------------------------------------------------
-- Table `mblog`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mblog`.`user` ;

CREATE  TABLE IF NOT EXISTS `mblog`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `mail` VARCHAR(256) NOT NULL ,
  `idnum` VARCHAR(30) NOT NULL ,
  `name` VARCHAR(45) NOT NULL ,
  `age` INT NOT NULL ,
  `intro` TEXT NULL ,
  `address` VARCHAR(100) NULL ,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `idnum_UNIQUE` (`idnum` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mblog`.`post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mblog`.`post` ;

CREATE  TABLE IF NOT EXISTS `mblog`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `user` INT NOT NULL ,
  `parent` INT NOT NULL DEFAULT 0 ,
  `title` VARCHAR(100) NOT NULL DEFAULT '' ,
  `msg` VARCHAR(140) NOT NULL ,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `forbidden` BIT NOT NULL DEFAULT 0 ,
  `src` VARCHAR(45) NOT NULL DEFAULT '' ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_post_user` (`user` ASC) ,
  CONSTRAINT `fk_post_user`
    FOREIGN KEY (`user` )
    REFERENCES `mblog`.`user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mblog`.`comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mblog`.`comment` ;

CREATE  TABLE IF NOT EXISTS `mblog`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `post` INT NOT NULL ,
  `user` INT NOT NULL ,
  `msg` VARCHAR(140) NOT NULL ,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `forbidden` BIT NOT NULL DEFAULT 0 ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_comment_user` (`user` ASC) ,
  INDEX `fk_comment_post` (`post` ASC) ,
  CONSTRAINT `fk_comment_user`
    FOREIGN KEY (`user` )
    REFERENCES `mblog`.`user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_post`
    FOREIGN KEY (`post` )
    REFERENCES `mblog`.`post` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mblog`.`friend`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mblog`.`friend` ;

CREATE  TABLE IF NOT EXISTS `mblog`.`friend` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `trunk` INT NOT NULL ,
  `branch` INT NOT NULL ,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_friend_trunk` (`trunk` ASC) ,
  INDEX `fk_friend_branch` (`branch` ASC) ,
  CONSTRAINT `fk_friend_trunk`
    FOREIGN KEY (`trunk` )
    REFERENCES `mblog`.`user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_friend_branch`
    FOREIGN KEY (`branch` )
    REFERENCES `mblog`.`user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mblog`.`msg`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mblog`.`msg` ;

CREATE  TABLE IF NOT EXISTS `mblog`.`msg` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `parentid` INT NOT NULL DEFAULT 0 ,
  `from` INT NOT NULL ,
  `to` INT NOT NULL ,
  `title` VARCHAR(100) NULL ,
  `body` TEXT NOT NULL ,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_msg_from` (`from` ASC) ,
  INDEX `fk_msg_to` (`to` ASC) ,
  CONSTRAINT `fk_msg_from`
    FOREIGN KEY (`from` )
    REFERENCES `mblog`.`user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_msg_to`
    FOREIGN KEY (`to` )
    REFERENCES `mblog`.`user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mblog`.`notice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mblog`.`notice` ;

CREATE  TABLE IF NOT EXISTS `mblog`.`notice` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `user` INT NOT NULL ,
  `type` ENUM('post','comment','friend','msg') NOT NULL ,
  `target` INT NOT NULL ,
  `saw` BIT NOT NULL DEFAULT 0 ,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_notice_user` (`user` ASC) ,
  CONSTRAINT `fk_notice_user`
    FOREIGN KEY (`user` )
    REFERENCES `mblog`.`user` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



