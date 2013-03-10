function fm() {
  var len = arguments.length;
  if (len == 0) return '';
  else if (len == 1) return arguments[0];

  var res = arguments[0], i;
  for (i = 1; i < len; ++i) {
    var re = new RegExp('\\{' + (i - 1) + '\\}', 'g');
    res = res.replace(re, arguments[i]);
  }
  return res;
}

function log() {
  var LOGID = '#__id_log',
    $logc = $(LOGID);
  if (!$logc.length) {
    $logc = $(fm(['<div id="{0}" style="',
      'position:absolute;bottom:0.5em; width:200px;overflow:visible;padding: 5px;',
      ' border: 1px solid #ddd; background: #fafad2;color:#555"></div>'].join(''), LOGID.substr(1)))
      .prependTo(document.getElementsByTagName('body')[0]);
  }

  $logc.prepend(fm('<div style="">{0}</div>', [].join.call(arguments, ' ')));
  $logc.find('>').css('font-weight', 'normal');
  $logc.find('>:first').css('font-weight', 'bold');
}

(function () {
  var C = {
    CODE_SEL:'#__codeSel',
    CODE_RUN:'#__codeRun',
    CODE_URL:'#__codeUrl',
    CODE_SRC:'#__codeSrc',
    CODE_WRAP:'#__codeWrap',
    C_CODE:'.__code'
  };
  $(C.CODE_SEL).change(
    function () {
      $(C.C_CODE).hide();
      $('#' + $(this).val()).show();
    }).change();
  $(C.CODE_RUN).click(function () {
    var targetId = '#' + $(C.CODE_SEL).val();
    if (C.CODE_URL === targetId) {
      var url = $(targetId).val();
      url += fm('{0}r{1}=1', (url.indexOf('?') < 0 ? '?' : '&'), +new Date);
      $.get(url, function (data) {
        $(C.CODE_WRAP).html(data);
      });
    } else if (C.CODE_SRC === targetId) {
      $(C.CODE_WRAP).html($(targetId).val());
    }
  });
})();