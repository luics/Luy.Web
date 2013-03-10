function $import(url, callback){
	var async = true;
	var caller = this.caller;
	if(typeof(callback) != 'function'){
	   async = false;
	}
	
	var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Msxml2.XMLHTTP');
	xmlhttp.open("GET", url, false);
	xmlhttp.onreadystatechange = function(){	
	   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			alert(xmlhttp.responseText);
			if(window.execScript) {
			// eval in global scope for IE
				window.execScript(xmlhttp.responseText);
			}
			else{
			 // 关键：用call来解决作用域问题 fo FF
				eval.call(window, xmlhttp.responseText);
			}
			
			if(typeof(callback) == 'function'){
				alert('');
				callback.call(caller);
			}
	   }
	}
	xmlhttp.send();
}