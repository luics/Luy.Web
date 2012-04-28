<html>
<head>
<title>DOM Sample</title>
<script type="text/javascript" src="dom.js" ></script>
<script type="text/javascript" src="utils.js" ></script>
<script type="text/javascript">

var disFunc=function(data){ dis(data);};
var disJson=function(data){ dis(data['a\'b']);};
function debugAjax(){
	//setInterval('if(__cnt++<20)loadXMLDoc()',1000);
	//luyAjax.debug();
	//var newAjax=new __LuyAjax();
	/*
	for(var i=0;i<20;i++){
		var url='sample.php?r='+Math.random();
		luyAjax.get(url, disFunc); 
	}
	*/
	//setInterval('if(__cnt++<10)luyAjax.get(\'sample.php?r=\'+Math.random(), disFunc); ',1500);
	//luyAjax.post(url, disFunc);
	//luyAjax.getJSON(url, disJson);
	//luyAjax.postJSON(url, disJson);
	//setInterval('dis(xmlhttp.readyState);', 2000);
	
}


var __cnt=0;
var xmlhttp=null;
function loadXMLDoc()
{
	if(xmlhttp==null){
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			try{
				xmlhttp=new XMLHttpRequest();
			}
			catch(failed)
			{
				throw(Errors.ajaxNotSupport);
			}
		}
		else{// code for IE6, IE5
			try{//尝试使用较新版本的 Microsoft 浏览器创建 Microsoft 兼容的对象(Msxml2.XMLHTTP)
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e){
				try{//尝试使用较老版本的 Microsoft 浏览器创建 Microsoft 兼容的对象(Microsoft.XMLHTTP)
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(failed){
					throw(Errors.ajaxNotSupport);
				}
			}
		}
	}
	
	var url="sample?r="+Math.random();
	xmlhttp.open("POST", url, true);
	xmlhttp.onreadystatechange=function()
	{
		//alert(xmlhttp.responseText);
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			dis(xmlhttp.responseText);
		}
	}
	xmlhttp.send();
}

function debugUtil(){	
	//alert(arguments.callee.caller.line);
	//luyUtil.view(arguments);
	var sb = new StringBuilder();
	sb.append(1);
	sb.append('ok');
	alert(sb);
	//__StringExtension();
}


function debugDOM(){
	var node=document.getElementById("pNode");
	//disNode(node);
	//disNode(node.ownerDocument);
	//dis(node.hasChildNodes());
	//__disMap(node.attributes);
	
	//disNode(node.firstChild, 3);
	//disNode(node.lastChild);
	//__disMap(node.childNodes);
	var newNode = document.createElement('div'); 
	newNode.id="newNode";
	newNode.innerHTML="newNode";
	//node.appendChild(newNode);
	//node.removeChild(node.firstChild);
	node.insertBefore(newNode, node.firstChild);	
	
	disTree(node);
}


window.onload=function(){	
	//debugDOM();
	debugAjax();
	//debugUtil();
};


function dis(res, tabNum){
	var tabNum = tabNum || 0;	
	var tab='';
	for(var i =0; i<tabNum; i++){
		tab+='&nbsp;&nbsp;&nbsp;&nbsp;';
	}
	document.getElementById("resPanel").innerHTML += (tab+res+"<br/>");
}

</script>
</head>
<body>

<div id="pNode">
	pNode
	<div id="cNode1">
	<!--Comments in cNode1-->
	cNode1
	</div>
	<div id="cNode2">
	cNode2
	</div>
	<div id="cNode3">
	cNode3
	</div>
</div>


<hr />
<div id="resPanel" style="border:solid 1px blue;">
</div>
<!--<table id="aTab" border="1">
  <tr>
    <td>John</td>
    <td>Doe</td>
    <td>Alaska</td>
  </tr>
</table>-->
</body>
</html>