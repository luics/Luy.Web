(function(mob){
  var U = mob.U;
  
  window.$ = function(strid) {
    if(document.querySelector){
      return document.querySelector(strid);    
    }else{
      return document.getElementById(strid.replace('#',''));        
    }
  }
      
  window.reset = function() {
    $('#status').innerHTML = '';
  }
		
  window.mylog = function () {
    for(var i=0; i<arguments.length;++i){
      $('#status').innerHTML += arguments[i] +' ';
    }
    $('#status').innerHTML += '<br>';
  }

  function genAscii(){
    var out = [];
    var cols = 5;
    var start = 32;
    var end = 127;
  
    out.push('<table>');
    for(var i= start; i<=end; i+=cols){    
      out.push('<tr>');
      for(var j=0; j<cols; ++j){
        var v = i + j;
        if(v >= end){
          out.push('<td></td>');
          continue;
        }
        out.push(U.f('<td><span class="seq">{0}</span> <span class="chr">{1}</span></td>',(v>99?v: v+'&nbsp;'), String.fromCharCode(v)));
      }
      out.push('</tr>');
    }
    out.push('<table>');
        
    $('#asc').innerHTML += out.join('');
  }
 
  window.decJson = function(){
    var v = baidu.mobads.U.dec($('#code').value);
    console.log(JSON.parse(v));
    mylog(v);
  };
  
  window.onload = function(){
    genAscii();
  };
})(baidu.mobads);