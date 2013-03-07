#### 分享内容

原本只计划讲connect和express，在看源码的过程中手痒了，写了个`connect-header`，还发布了；所以干脆把module的开发一起拉进来。

> module全称Node Packaged Module，很多语言也有类似的概念，如：python、perl

`connect-header`源码在[github](https://github.com/luics/connect-header)，也可以直接安装：

    npm install connect-header

写README的过程中，发现markdown很方便，于是乎包装了`github-flavored-markdown`写了个md转html文件的小工具；抠了2套皮肤，其中一个是github。

> PS：这封邮件可以这么转，考虑到大家的习惯，直接上文本；时间有限，Usage写得比较简单，参数也没列出来，感兴趣同学可以直接看`/lib/util.js`

`markdown-util`源码在[github](https://github.com/luics/markdown-util)，也可以直接安装：

    npm install markdown-util

#### Demo简介

附件是本次分享中用到的Demo，文件结构如下：

> connect
├ bodyParse 解析Post请求
├ connect-header 学习`middleware` & `module`开发的例子
└ static 简单的静态服务器
express
├ generated 脚本生成的express项目
├ hello-world 
└ static 简单的静态服务器
markdown-util
├ hello.md 自己写的Markdown Cheat Sheet
├ mail.md **这封邮件**
└ md2html.js 简单的demo 

#### 写在最后

分享是个奇妙的事情，准备的过程充满了惊喜；知识分享给了大家，自己却是收获最大的那个。