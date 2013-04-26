<?php include_once('permission.php'); ?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>直通雅安 —— 雅安地震灾区物资需求汇总</title>
    <link rel="stylesheet" href="css/wuzi.css"/>
    <link rel="stylesheet" href="css/record.css"/>
</head>
<body>

<div class="main">
    <div class="header">
        <!--<h1>直通雅安 —— 雅安地震灾区物资需求汇总</h1>-->
    </div>
    <div class="nav">
        新建/编辑信息
    </div>
    <div class="body">
        <div class='loading'>加载中..</div>
        
        <div class="op">
            <table>
                <tbody>
                <tr>
                    <td>地域</td>
                    <td><input type="text" id="addr" value="市县名称"/></td>
                </tr>
                <tr>
                    <td>食物、水</td>
                    <td><input type="text" id="water" value="0"/></td>
                </tr>
                <tr>
                    <td>帐篷防水布</td>
                    <td><input type="text" id="tent" value="0"/></td>
                </tr>
                <tr>
                    <td>照明、发电</td>
                    <td><input type="text" id="lamp" value="0"/></td>
                </tr>
                <tr>
                    <td>医药器械</td>
                    <td><input type="text" id="medm" value="0"/></td>
                </tr>
                <tr>
                    <td>药品</td>
                    <td><input type="text" id="drug" value="0"/></td>
                </tr>
                <tr>
                    <td>棉被、棉絮</td>
                    <td><input type="text" id="quilt" value="0"/></td>
                </tr>
                <tr>
                    <td>衣物</td>
                    <td><input type="text" id="cloth" value="0"/></td>
                </tr>
                <tr>
                    <td>通信</td>
                    <td><input type="text" id="com" value="0"/></td>
                </tr>
                <tr>
                    <td>儿童用品/卫生用品</td>
                    <td><input type="text" id="child" value="0"/></td>
                </tr>
                <tr>
                    <td>运输</td>
                    <td><input type="text" id="trans" value="0"/></td>
                </tr>
                <tr>
                    <td>其它</td>
                    <td><input type="text" id="other" value="0"/></td>
                </tr>
                </tbody>
            </table>
            <button class="submit" id="submit">提交</button> <a id="del" href="javascript:void(0);">删除</a>
        </div>

    </div>
    <div class="footer">
        <!--直通雅安 —— 雅安地震灾区物资需求汇总-->
    </div>
</div>

<script src="http://a.tbcdn.cn/s/kissy/1.3.0/??kissy-min.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/record.js"></script>
<script type="text/javascript">
    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cscript async='async' src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fa99be81900bf4127aabe26b3067b442e' type='text/javascript'%3E%3C/script%3E"));
</script>
</body>
</html>