var R = {
    'zh-CN':{
        lbText1:"文本1",
        lbText2:"文本2"
    },
    'en-US':{
        lbText1:"Text 1",
        lbText2:"Text 2"
    }
    //..
};

function i18n(lang) {
    lang = lang || 'zh-CN';

    var labels = document.getElementsByTagName('label'),
        i = 0,
        label;

    for (i = 0; i < labels.length; ++i) {
        label = labels[i];
        label.innerHTML = R[lang][label.id];
    }
}

window.onload = function () {
    i18n('zh-CN');
};