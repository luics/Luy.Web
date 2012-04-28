function __disMap(map){
	for(var a in map){
		disNode(map[a]);
	}
}

function __repr(res){
	res = res.replace("\n","\\n").replace(" ","&nbsp;")
	return res;
}

function disNode(node, tabNum){
	var res=node.nodeName+"("+node.nodeType+")";
	//~dis(node.firstElementChild.id)
	if(node.nodeType==1){
		res += "#"+node.id;
	}
	else if(node.nodeType==2 || node.nodeType==3 || node.nodeType==8){
		res += " ["+__repr(node.nodeValue) +"]";
	}
	else if(node.nodeType==9){
		res += node.nodeName;
	}	
	else{
		res ="ERROR: " + node;	
	}
	dis(res, tabNum);
}

function disTree(node, mode){	
	//Normal / IE: eliminate space and line break
	//Firefox / All: show all
	//Element: just elements
	var mode = mode || "Normal";
	if(mode!="Normal"
	&& mode!="IE"
	&& mode!="All"
	&& mode!="Firefox"
	&& mode!="Element"){
		alert("Error mode (Normal|IE|All|Firefox|Element)");
		return;
	}
	__disTree.mode=mode;
	if(typeof(node)!="undefined" && node.nodeType==1){
		__disTree(node, 0);
	}
}

function __disTree(node, level){
	if(__disTree.mode=="Normal" || __disTree.mode=="IE"){
		if((node.nodeType==3 || node.nodeType==8)
		&& node.nodeValue.replace(/\n/g,'').replace(/\s/g,'')=='' ){
		}
		else{
			disNode(node, level);
		}
	}	
	if(__disTree.mode=="All" || __disTree.mode=="Firefox"){		
		disNode(node, level);
	}
	else if(__disTree.mode=="Element"){
		if(node.nodeType==1)
			disNode(node, level);	
	}
	//recursively to children
	for(var i=0;i<node.childNodes.length;i++){
		__disTree(node.childNodes[i], level+1);
	}
}
