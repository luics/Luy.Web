var startBaiduHi = function (I, E, G, F) {
    //report(I, E, G, F);
//    var v = getVersion();
//    if (v == "") {
//        if (/c2cmsg|message|addcontact|addgroup|creategroup/i.test(I)) {
//            B(G);
//            if (F && F.onwebim) {
//                F.onwebim();
//            }
//        }
//        return false;
//    }
//    if (!(new RegExp(v.replace(/(\.)/g, "\\."), "i")).test(I)) {
//        return false;
//    }
    var href = "baidu://" + I + "/?sid=" + E + "&id=" + G;//+ _dump(F);
    var isIE = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;
    var isFF = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;
    if (isIE) {
        href = href + "&browser=IE";
    } else if (isFF) {
        href = href + "&browser=FF&promo=c2cmsg|message|addgroup|creategroup|addcontact";
    }
    if (F && F.onim) {
        F.onim();
    }
    
    //alert(href);
    window.location.href = href;
}