  // For IE
  if (typeof window.event != 'undefined') {
    document.onkeydown = function() {
      var type = event.srcElement.type;
      var code = event.keyCode;
      if ((code != 8 && code != 13) ||
        (type == 'text' && code != 13 ) ||
        (type == 'password' && code != 13 ) ||
        (type == 'textarea') ||
        (type == 'submit' && code == 13)){
        return true;
      }else{
        console.log('document.onkeydown catch', code);
        return false          
      }
    }
  } else { // FireFox/Others
    document.onkeypress = function(e) {
      var type = e.target.type;
      var code = e.keyCode;
      if ((code != 8 && code != 13) ||
        (type == 'text' && code != 13 ) ||
        (type == 'password' && code != 13 ) ||
        (type == 'textarea') ||
        (type == 'submit' && code == 13)) {
        return true
      } else {
        //alert('你真的想放弃现在正在编辑的内容吗？再想想！');
        console.log('document.onkeypress catch', code);
        return false
      }
    }
  }