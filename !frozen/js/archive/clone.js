/************************************/
function clone()
{
	var ret;
	if(this instanceof Function)
	{
		ret=Function(new String("return ")+this)();
	}
	else if(this instanceof Array)
	{
		ret=new Array();
	}
	else if(this instanceof Date)
	{
		ret=new Date();
		ret.setTime(this.getTime());
	}
	else if( (this instanceof String) || (this instanceof Boolean) || (this instanceof Number) )
	{
		return this;
	}
	else ret=new Object();

	for(var p in this)
	{
		ret[p]=this[p];
	}
	return ret;
}

function deepClone()
{
	var ret;
	if(this instanceof Function)
	{
		ret=Function(new String("return ")+this)();
	}
	else if(this instanceof Array)
	{
		ret=new Array();
	}
	else if(this instanceof Date)
	{
		ret=new Date();
		ret.setTime(this.getTime());
	}
	else if( (this instanceof String) || (this instanceof Boolean) || (this instanceof Number) )
	{
		return this;
	}
	else ret=new Object();

	for(var p in this)
	{
		if(typeof ret[p]!="object")ret[p]=this[p];
		else ret[p]=deepClone.call(this[p]);
	}
	return ret;
}
   
Object.prototype.prototypeClone=function ()
{
	if(this instanceof Function)
	{
		var tmp=Function.prototype;
		Function.prototype=this;
		var ret=(new Function(new String("return ")+this))();
		Function.prototype=tmp;
		return ret;
	}
	else if(this instanceof Array)
	{
		var tmp=Array.prototype;
		Array.prototype=this;
		var ret=new Array();
		Array.prototype=tmp;
		return ret;
	}
	else if(this instanceof Date)
	{
		var tmp=Date.prototype;
		Date.prototype=this;
		var ret=new Date();
		ret.setTime(this.getTime());
		Date.prototype=tmp;
		return ret;
	}
	else if( (this instanceof String) || (this instanceof Boolean) || (this instanceof Number) )
	{
		return this;
	}
	else
	{
		var constructor=function(){};
		constructor.prototype=this;
		return new constructor;
	}
} 