-- ==========================================
-- PROCEDURE
-- ==========================================
USE mblog;

delimiter //

CREATE PROCEDURE data_init (IN user_num INT, IN post_num INT, IN comment_num INT)
BEGIN        
    SET @i = 0; 
    WHILE @i < user_num DO  
        -- user
        SET @name = CONCAT('user', @i);
        INSERT INTO user(name, age, idnum, mail, intro, address) VALUES ( @name, 20 + @i % 30, CONCAT('123x', @i),
            CONCAT(@name, '@abc.com'), CONCAT(@name, ' intro'), CONCAT(@name, ' addr'));

        SET @j = 0;
        WHILE @j < post_num DO     
            -- post
            INSERT INTO post(user,msg,src) VALUES ( @i + 1, CONCAT('微博 @user', @i, ' #', @j), CONCAT('Android'));  

            SET @k = 0, @post = @i * user_num +  @j + 1;
            WHILE @k < comment_num DO
                -- comment
                INSERT INTO comment(post,user,msg) VALUES (@post, @i + 1, CONCAT('评论 @user', @i, ' #', @j, ' *', @k));

                SET @k = @k + 1;
            END WHILE;
            SET @j = @j + 1;
        END WHILE;
        SET @i = @i + 1;
    END WHILE; 
END
//
delimiter ;
-- ==========================================
-- Main
-- ==========================================
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

-- 依次为用户数、微博数/用户、评论数/微博
CALL data_init(100, 10, 10);
-- Check Results
SELECT COUNT(*) AS users, (SELECT COUNT(*) FROM mblog.post) AS posts, (SELECT COUNT(*) FROM mblog.comment) AS comments FROM mblog.user;

SELECT * FROM comment ORDER BY id DESC LIMIT 3;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
