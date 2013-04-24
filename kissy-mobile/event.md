> 从移动平台和主流开源项目汇总触屏事件, 期望整理出一份通用的触屏事件列表

* Version 1.0
* Author 鬼道(luics)
* Update 2013-04-09

## 触屏事件

### android
[Android Gestures](http://developer.android.com/design/patterns/gestures.html)

### ios
[ios Gestures](http://developer.apple.com/library/ios/#documentation/EventHandling/Conceptual/EventHandlingiPhoneOS/GestureRecognizer_basics/GestureRecognizer_basics.html) Tabel 1-1

    Tapping (any number of taps)
    Pinching in and out (for zooming a view)
    Panning or dragging
    Swiping (in any direction)
    Rotating (fingers moving in opposite directions)
    Long press (also known as “touch and hold”)

<!--[ios TouchEvent](http://developer.apple.com/library/safari/#documentation/UserExperience/Reference/TouchClassReference/Touch/Touch.html#//apple_ref/javascript/cl/Touch)-->

### wp 
[Windows Phone Gesture](http://www.windowsphone.com/en-us/how-to/wp7/start/gestures-flick-pan-and-stretch)

注: windows phone的触屏事件名称比较奇葩

### Hammer.js
[Hammer Gestures](https://github.com/EightMedia/hammer.js/wiki/Getting-Started)

    hold
    tap
    doubletap
    drag, dragstart, dragend, dragup, dragdown, dragleft, dragright
    swipe, swipeup, swipedown, swipeleft, swiperight
    transform, transformstart, transformend
    rotate
    pinch, pinchin, pinchout
    touch (gesture detection starts)
    release (gesture detection ends)

### 其他参考资料
* [Multi-touch Web Development](http://www.html5rocks.com/en/mobile/touch/)
* [Touch Events version 1](https://dvcs.w3.org/hg/webevents/raw-file/tip/touchevents.html)
* [fastclick](https://github.com/ftlabs/fastclick)

## 通用触屏事件

可以看到通用的触屏事件至少包括: 

* 滑动(swipe), 方向上下左右
* 捏(pinch), 常用于放大(zoom in)缩小(zoom out)视图
* 旋转(rotate), 常用于旋转视图
* 拖拽(drag)
* 长按(hold), android和ios都叫long press, 感觉叫hold更形象

点击稍复杂:

* android称为[touch](http://developer.android.com/design/patterns/gestures.html), 双击是double touch
* ios, wp和hammer称为tap, hammer可参考其[源码注释](https://github.com/EightMedia/hammer.js/blob/master/src/gestures.js)
* touch这个事件本身分为touchstart/end/move/cancel, 参见[spec](https://dvcs.w3.org/hg/webevents/raw-file/tip/touchevents.html)
* 少数服从多数, 就叫tap

### 通用触屏事件列表


注: 下表给出是触屏事件中的元事件, 组合事件如: hold+swipe在Android上用在移动桌面图片; 由于组合事件众多, 不一一列出

<table>
<thead>
<tr>
    <th nowrap="nowrap">事件类别</th>
    <th width="200">事件描述</th>
    <th nowrap="nowrap">简称</th>
    <th width="140">别称</th>
    <th>动作定义</th>
</tr>
</thead>
<tbody>
<tr>
    <td>tap</td>
    <td>移动平台默认浏览器的click事件有300ms+的延时, 通常使用touch事件模拟, 为区别点击称为拍击:
        <ul>
            <li><code>tap</code> 拍击</li>
            <li><code>doubletap</code> 双击</li>
            <li><code>hold</code> 长按</li>
            <li><code>tapn</code> n(2,3..)指拍击</li>
        </ul>
    </td>
    <td>拍击</td>
    <td>
        <ul>
            <li>android: touch</li>
        </ul>
        hold称呼较多:
        <ul>
            <li>android/ios: long press</li>
            <li>wp: tap and hold</li>
            <li>也有称为press</li>
        </ul>
    </td>
    <td><img alt="tap" src="http://cmsresources.windowsphone.com/windowsphone/en-us/How-to/wp7/block/gettingstarted-concept-tap-gesture.png"></td>
</tr>
<tr>
    <td>swipe</td>
    <td>按方向细分为:
        <ul>
            <li><code>swipe</code> 单指滑动</li>
            <li><code>swipeleft</code> 单指向左滑动</li>
            <li><code>swiperight</code> 单指向右滑动</li>
            <li><code>swipeup</code> 单指向上滑动</li>
            <li><code>swipedown</code> 单指向下滑动</li>
            <li><code>swipen</code> n(2,3..)指滑动</li>
        </ul>
    </td>
    <td>滑动</td>
    <td>
        <ul>
            <li>wp: flick</li>
        </ul>
    </td>
    <td><img alt="swipe" src="http://cmsresources.windowsphone.com/windowsphone/en-us/How-to/wp7/block/gettingstarted-concept-flick-gesture.png"></td>
</tr>
<tr>
    <td>drag</td>
    <td> 
    <ul>
        <li><code>drag</code> 拖拽</li>
        <li><code>dragstart</code> 拖拽开始</li>
        <li><code>dragend</code> 拖拽结束</li>
        <li><code>dragup</code> 向上拖拽</li>
        <li><code>dragdown</code> 向下拖拽</li>
        <li><code>dragleft</code> 向左拖拽</li>
        <li><code>dragright</code> 向右拖拽</li>
    </ul>
    </td>
    <td>拖拽</td>
    <td>
    <ul>
        <li>ios/wp: pan</li>
    </ul>
    </td>
    <td><img alt="drag" src="http://developer.android.com/design/media/gesture_drag.png"></td>
</tr>
<tr>
    <td>pinch</td>
    <td>常用于放大(zoom in)缩小(zoom out)视图:
    <ul>
        <li><code>pinchin</code> 双指捏合</li>
        <li><code>pinchout</code> 双指展开</li>
        <li><code>squeeze</code> 五指捏合</li>
        <li><code>splay</code> 五指展开</li>
    </ul>
    </td>
    <td>捏</td>
    <td>
    <ul>
        <li>android: pinch open/close</li>
        <li>pinchout也有称为spread</li>
    </ul>
    </td>
    <td><img alt="pinch" src="http://cmsresources.windowsphone.com/windowsphone/en-us/How-to/wp7/block/gettingstarted-concept-pinch-and-stretch-gesture.png"></td>
</tr>
<tr>
    <td>rotate</td>
    <td>常用于旋转视图
        <ul>
            <li><code>rotatecw</code> 顺时针旋转</li>
            <li><code>rotateccw</code> 逆时针旋转</li>
        </ul>
    </td> 
    <td>旋转</td> 
    <td></td> 
    <td><img alt="rotate" src="http://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Gestures_Rotate.png/250px-Gestures_Rotate.png"></td>
</tr>
<tr>
    <td>shake</td>
    <td>常用于游戏中控制方向, 细分为:
        <ul>
            <li><code>shake</code> 移动设备</li>
            <li><code>shakeup</code> 向上移动设备</li>
            <li><code>shakedown</code> 向下移动设备</li>
            <li><code>shakeleft</code> 向左移动设备</li>
            <li><code>shakeright</code> 向右移动设备</li>
            <li><code>shakeforward</code> 向前移动设备</li>
            <li><code>shakeback</code> 向后移动设备</li>
            <li><code>shakeleftright</code> 左右移动设备</li>
            <li><code>shakeforwardback</code> 前后移动设备</li>
            <li><code>shakeupdown</code> 上下移动设备</li>
        </ul>
    </td> 
    <td>重力感应</td> 
    <td></td> 
    <td><img alt="shake" src="http://www.oscarvgg.com/wp-content/uploads/2010/11/Responding-to-a-Shake-Gesture-icon.png"></td>
</tr>
</tbody>
</table>
