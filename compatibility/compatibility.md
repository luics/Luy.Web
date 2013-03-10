# 前端兼容性不完全指南

[luics](luics.xu@gmail.com) 

<!--@date 2013-01-17-->


## 常见兼容性问题

兼容性问题简分类

* 按照所属？：CSS兼容性、JS兼容性、HTML兼容性，还可以继续细分。
* ？

兼容性文章很多很散，[quirksmode][quirksmode],[w3help](http://w3help.org/zh-cn/home/compatibility.html)文章较集中、较严谨，其他主要参考的站点还有[前端观察](http://www.qianduan.net/)。

下面只列出部分工程中常见的兼容性问题，可忽略w3help中在quirk mode下的测试。

### Quirk mode

某些特殊的doctype触发quirk mode(混杂模式、怪异模式)，ie6未加doctype亦触发quirk mode。

表现之一：box model中width的计算（[Demo](demo/box.html)）
 
* 混杂模式：border + padding + innerwidth
* 标准模式：只有innerwidth

![box](http://w3help.org/tests/RB1006/boxdim.png)

更多表现请参见[Quirks mode and strict mode](http://www.quirksmode.org/css/quirksmode.html)

quirk mode毕竟是“那个时代”的产物，渐渐离我们远去，工程上应该避免触发quirk mode。

*结论*：doctype推荐使用`<!DOCTYPE html>`

常见doctype请参考[KB001: 兼容性问题与浏览器的内核及渲染模式](http://w3help.org/zh-cn/kb/001)

#### 引发的问题

* [RD8001: 各浏览器中 'width' 和 'height' 在某些元素上的作用位置有差异](http://w3help.org/zh-cn/causes/RD8001) 这是上文demo的扩展版，应该避免quirk mode。

### hasLayout

    “The hasLayout property is a Document Object Model (DOM) property that indicates when an element has a layout. It is used internally only in quirks mode and IE7 mode to implement CSS positioning. It is not used at all in IE8 mode or IE9 Mode.”

[犄角旮旯处][ms-hl-5]找到上面描述，IE8和IE9标准模式下已经弃用hasLayout，下面是目录，这些信息很重要：

* [5 Appendix C: hasLayout][ms-hl-5]
* [5.1 The hasLayout HTML Elements][ms-hl-5.1] (部分元素默认具有haslayout)

        html, body, table, tr, th, td, img, hr, input, button, select, textarea, fieldset, legend, iframe, embed, object, applet, marquee
           
* [5.2 The hasLayout Property Triggers and Resets][ms-hl-5.2] (触发haslayout的完整列表，常通过`zoom:1`触发hasLayout)
* [5.3 The hasLayout Property and CSS2.1][ms-hl-5.3] (Containing Blocks？)

其他资源：

* [IE 专有的 Layout 及 hasLayout 属性](http://w3help.org/zh-cn/causes/RM8002#impacted_browsers)
* quirksmode [hasLayout bug report](http://www.google.com.hk/search?hl=zh-CN&newwindow=1&safe=strict&tbo=d&site=&source=hp&q=site%3Aquirksmode.org+haslayout&btnK=Google+%E6%90%9C%E7%B4%A2)
* [haslayout综合](http://www.qianduan.net/comprehensive-haslayout.html)

#### 引发的问题

* [RB1006: IE6 IE7 IE8(Q) 中触发了 hasLayout 的元素若包含 TEXTAREA 元素及某些 type 的 INPUT 元素，其 'margin-left' 和 'margin-right' 会与预期不符](http://w3help.org/zh-cn/causes/RB1006)，一种导致“double margin” 的原因
* [RB8004: IE6 IE7 IE8(Q) 中浮动元素和绝对定位元素某些情况下会影响普通流中毗邻 'margin' 的折叠](http://w3help.org/zh-cn/causes/RB8004)，Demo：[margin折叠](demo/margin.html)
* [RB1001: IE6 IE7 IE8(Q) 负边距 (margin) 导致元素溢出 hasLayout 容器时显示异常](http://w3help.org/zh-cn/causes/RB1001)，负margin引起的问题较多
* [RB1005: IE6 IE7 IE8(Q) 中父元素或子元素触发 hasLayout 时子元素的 margin 值与期望值不符](http://w3help.org/zh-cn/causes/RB1005)
* [RM8002: 不能同时在 IE6 IE7 IE8(Q) 中触发 hasLayout 并在其他浏览器中创建 Block Formatting Context 的元素在各浏览器中的表现会有差异](http://w3help.org/zh-cn/causes/RM8002)，看吐了，慎入
* [RD1013: IE6 IE7 IE8(Q) 中触发 hasLayout 的空块级非替换元素的高度不是 0](http://w3help.org/zh-cn/causes/RD1013)，`常见`于提示信息的容器

### Block Formatting Context

[Block Formatting Context](http://w3help.org/zh-cn/causes/RM8002#standard_reference)，通常简称BFC

    Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.
   
#### Float

浮动有着十分严格的约束，参见[W3C Float Position](http://www.w3.org/TR/CSS21/visuren.html#float-position)

* IE6/7下`非常常见` [RM8005: IE6 IE7 IE8(Q) 中行内元素后相邻的浮动元素在某些情况下会折行放置在之前行内元素所在行框的底部](http://w3help.org/zh-cn/causes/RM8005)
* [RM8014: IE6 IE7 IE8(Q) 中某些情况下浮动元素会在其浮动方向溢出其包含块](http://w3help.org/zh-cn/causes/RM8014)

#### Postion

* [RM8018: IE6 IE7(Q) IE8(Q) 中包含块若未触发 hasLayout 则会影响参照其定位的绝对定位元素的偏移位置计算](http://w3help.org/zh-cn/causes/RM8018)，IE6下`非常常见` 
* [RD8008: IE6 IE7(Q) IE8(Q) 绝对定位元素无法根据其四个方向的偏移量自动计算其尺寸](http://w3help.org/zh-cn/causes/RD8008)

了解z-index和`层叠上下文`（[stacking context](http://www.w3.org/TR/CSS21/visuren.html#layers)）

* [RM8015: IE6 IE7 IE8(Q) 中定位元素 'z-index' 为默认值在某些情况下会产生新的层叠上下文](http://w3help.org/zh-cn/causes/RM8015)

### CSS Selector

完整列表参见[quirksmode](http://www.quirksmode.org/css/contents.html)或[w3help](http://w3help.org/zh-cn/causes/index.html)"渲染-CSS相关"，下面列举部分重要的问题：

* [LoVe HAte](http://w3help.org/zh-cn/causes/RS3005)，了解下针对性（[Specificity](http://www.w3.org/TR/CSS21/cascade.html#specificity)）这个概念，其实就是样式优先级。下面的写法是正解:

        a {font:bold 50px Verdana;}
        a:link {color:red;}    /* [0,0,1,1] */
        a:visited {color:green;}  /* [0,0,1,1] */
        a:hover {color:blue;}    /* [0,0,1,1] */
        a:active {color:yellow;}  /* [0,0,1,1] */
        a.test:link, a.test:visited, a.test:hover, a.test:active {color:black;}    /* [0,0,2,1] */
* [Multiple classes](http://www.quirksmode.org/css/multipleclasses.html)， `p.class1.class2`IE6错误理解为`p.class2`
* 子选择器`div>p`，IE6不支持
* 相邻兄弟选择器`div+p`，IE6不支持
* 属性选择器`div[attr]`，IE6不支持
* 伪元素
    * :first-child IE6不支持
    * :hover IE6不支持（A除外）
    * :active IE6、7不支持（A除外） 
    * :focus、:before、:after IE6、7不支持

### CSS Cascade

优先级升序（0为最低），请参考 CSS2.1规范[Cascade Order](http://www.w3.org/TR/CSS2/cascade.html#cascading-order)

0. user agent declarations
0. user normal declarations
0. author normal declarations
0. author important declarations
0. user important declarations

几处bug需要关注

* [RA8001: IE6 IE7 IE8(Q) 不支持 CSS 特性的 'inherit' 值及 IE8(S) Opera 对此特性值的支持缺陷](http://w3help.org/zh-cn/causes/RA8001)
* [RA8003: IE6 IE7(Q) IE8(Q) 不完全支持 !important 规则](http://w3help.org/zh-cn/causes/RA8003)

### 其他问题

overflow

* [RD1002: IE6 IE7(Q) IE8(Q) 中一个非替换元素的 'overflow' 为 'visible' 时其尺寸会为了容纳其非绝对定位的内容而变大](http://w3help.org/zh-cn/causes/RD1002)，`常见`
* [RV1001: 各浏览器中当 'overflow-x' 和 'overflow-y' 一个值为 'hidden' 另一个值为 'visible' 时的组合渲染结果存在差异](http://w3help.org/zh-cn/causes/RV1001)
* [RV1002: IE6 IE7 IE8(Q) 中 'overflow' 特性不为 'visible' 的非定位元素内包含溢出的定位元素时的渲染效果有误](http://w3help.org/zh-cn/causes/RV1002)
* [RV8003: IE 中同一条规则下的后定义的 overflow 特性值不会覆盖之前设定的 overflow-x 和 overflow-y 特性值](http://w3help.org/zh-cn/causes/RV8003)

font-family，`正确`写法请不要随意使用引号（字体族除外）。

* [RY1001: IE6 IE7 IE8(Q) 会自动修复 'font-family' 特性的值是由一个引号包括了整个字体家族时的错误书写的代码](http://w3help.org/zh-cn/causes/RY1001)

其他

* [RD1016: 各浏览器对常用行内替换元素的 'baseline' 位置理解不同](http://w3help.org/zh-cn/causes/RD1016)，“垂直对不齐”问题，常见于checkbox、radio和label垂直居中对齐方式
* [RD1012: 不同浏览器内 'line-height' 样式设置会影响不同行内替换元素的显示高度](http://w3help.org/zh-cn/causes/RD1012)
* [RD8015: IE6 IE7(Q) IE8(Q)不支持 'min-height' 和 'max-height' 特性](http://w3help.org/zh-cn/causes/RD8015)

## 一些心得

了解兼容性是为了写出最高质量的代码，降低后续维护难度。

太多的文章只是对官方标准的翻译（包括W3Help），你甘心永远读着别人的文章？为何不一劳永逸地搞懂问题？

所有不明白的最终都可以从官方文档中找到，请耐心尝试数次，以后就不需要求人了。

我们到底要耗多少时间才能彻底弄明白兼容问题？

* 具体时间不知
* 一定是积累的过程，很难一劳永逸
* 适当的工具在手，可以减少工程上的耗时
* 了解兼容性产生的原因，心里会更有底

### 兼容性分类

下面的分类同时也是调试前端bug的推荐流程：

0. `特性支持` 请使用[caniuse][caniuse]确认核心特性的浏览器支持范围，典型如某些CSS选择器、某些CSS属性
0. `hasLayout` 参见本文[hasLayout](#Haslayout)章节，大部分涉及IE6/7的bug均源于此
0. `float` 
0. `margin`
0. `table`
0. 自己不熟悉的特性往往也是bug的楦头
 
## 标准&工具


### 通用工具

* `推荐`[quirksmode](http://www.quirksmode.org/compatibility.html)兼容表，内容庞大
    * [Mobile](http://www.quirksmode.org/mobile/)兼容性是亮点；[A tale of two viewports](http://www.quirksmode.org/mobile/viewports.html)
* [caniuse][caniuse] 主要是HTML5, CSS3兼容性检测
        
        Compatibility tables for support of HTML5, CSS3, SVG and more in desktop and mobile browsers.
* [webdevout](http://www.webdevout.net/) 很久前人家推荐的，留在这里作纪念

### CSS

* [CSS协议总览](http://www.w3.org/TR/CSS)
* [CSS2](http://www.w3.org/TR/CSS2/syndata.html)
* [CSS2.1](http://www.w3.org/TR/CSS21/syndata.html)
* [Mozilla CSS Reference](https://developer.mozilla.org/en-US/docs/CSS/CSS_Reference)，相比较W3C，更适合FE
* CSS Hack，尽管不推荐，但有备无患
    * quirksmode [css hack](http://www.quirksmode.org/css/csshacks.html)
    * 葵中剑[CSS-Hack-Table](http://www.swordair.com/tools/css-hack-table/)
    * [ie对CSS支持状况][[ms-css]]
    * [各浏览器对 CSS 错误解析规则的差异及 CSS hack](http://w3help.org/zh-cn/causes/RY8003)
* CSS3工具
    * [CSS Generator](http://css3generator.com/)，减少记忆
    * [Ultimate CSS Gradient Generator](http://www.colorzilla.com/gradient-editor/)，做渐进色很方便
    
### JS

* ES5
* ES6

### HTML

* HTML 4.01
* HTML 5

[caniuse]: http://caniuse.com
[quirksmode]: http://www.quirksmode.org
[ms-hl-5]: http://msdn.microsoft.com/en-us/library/ff405844(v=vs.85).aspx
[ms-hl-5.1]: http://msdn.microsoft.com/en-us/library/ff405944(v=vs.85).aspx
[ms-hl-5.2]: http://msdn.microsoft.com/en-us/library/ff405917(v=vs.85).aspx
[ms-hl-5.3]: http://msdn.microsoft.com/en-us/library/ff406015(v=vs.85).aspx
[ms-css]: http://msdn.microsoft.com/en-us/library/ff405926(v=vs.85).aspx