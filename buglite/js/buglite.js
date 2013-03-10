/*
	Bug Lite v1.0.0

	By Luy Xu
*/
(function($){
	function Buglite(options) {
		if(typeof Buglite.initialized === 'undefined'){
			Buglite.initialized=true;
		}
		else{
			throw 'Buglite is a singleton';
			return;
		}
		
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;
		
		base._init = function(){
			base.options = $.extend({}, Buglite.defaults, options);
			
			//constructing layout
			$(function(){
				var layout = Buglite.layout;
				for(var k in base.options.ids){
					layout = layout.replace('{'+k+'}', base.options.ids[k]);
				}
				for(var k in base.options.labels){
					layout = layout.replace(new RegExp('\{'+k+'\}', 'g'), base.options.labels[k]);
				}
				$('body').append(layout);
				
				//generate jquery object
				for(var k in base.options.ids){
					//this['get'+k[0].toUpperCase()+k.substring(1)]=function(){return $('#'+)};
					base['$'+k]=$('#'+base.options.ids[k]);
				}
				
				
				var changePosition =function(){
					//console.log($(window).width()+'|'+ $(document).width());
					base.$bugliteWindow.width($(window).width());
					if(window.event){//ie
						//return;
						var toTop=$(window).height()+$(window).scrollTop();
						base.$bugliteStatusbar.css('position', 'absolute');
						base.$bugliteStatusbar.css('top', toTop-base.$bugliteStatusbar.height());
						base.$bugliteWindow.css('position', 'absolute');
						base.$bugliteWindow.css('top', toTop-base.$bugliteWindow.height());
					}
				}
				
				$(window).resize(changePosition);
				$(window).scroll(changePosition);
				$(window).scroll();
				//$(window).resize(changePosition);
								
				//alert($(body).height());
				base.$logContainer.click(function(){
					console.log();
					console.log('log');
					console.debug('debug');
					console.info('info');
					console.warn('warn');
					console.error('error');
				});
				
				base.open();
			});
			
			//initing
			base.override(base.options.override);
		};
		
		base.override = function(flag){
			if(typeof Buglite.firebugConsole !== 'undefined'){//in firebug context
				var targetConsole = flag?Buglite.console:Buglite.firebugConsole;
				Buglite.override(targetConsole);
			}
		};
		
		/****************************
		* Display Functions
		****************************/		
		/*base.display = function(flag){
			flag?base.$bugliteWindow.show():base.$bugliteWindow.hide();
		};*/
		base.close = function(){
			base.$bugliteWindow.hide();
			base.$bugliteStatusbar.hide();
		};
		
		base.minimize = function(){
			base.$bugliteWindow.hide();
			base.$bugliteStatusbar.show();
		};
		
		base.maximize = function(){
			base.$bugliteWindow.show();
			base.$bugliteStatusbar.hide();
		};
		
		base.open = function(){
			base.$bugliteWindow.show();
			base.$bugliteStatusbar.hide();
		};
		
		/****************************
		* Log Functions
		****************************/
		base.log = function(msg){
			base.$logContainer.append(msg);
		};
		
		base.logClear = function(){
			base.$logContainer.empty();
		};
		
		base.logFilter = function(filter){
			filter = filter || '';
			//alert(filter);
			if('' === filter){
				base.$logContainer.find('div').show();		
			}
			else{
				base.$logContainer.find('div.' + filter).show();
				base.$logContainer.find(['div[class!=', filter, ']'].join('')).hide();		
			}
		};
		
		/****************************
		* Script Functions
		****************************/
		base.script = function(msg){
			var s=base.$scriptContainer.val();
			if(s===''){
				return;
			}
			
			console.log('&gt;&gt;&gt; ' + s);
			try{
				console.log(eval(s));
			}
			catch(e){
				console.error(e);
			}
		};
		
		base.scriptClear = function(){
			//console.log('d');
			base.$scriptContainer.val('');
		};
		
		base._init();
	}
	
	Buglite.defaults = {
		override: true //cover window.console even when it's existed
		,display: true
		,ids: {
			bugliteStatusbar: '__bugliteStatusbar'
			,bugliteWindow: '__bugliteWindow'
			,logContainer: '__bugliteLogContainer'
			,scriptContainer: '__bugliteScriptContainer'
			,tabConsole: '__bugliteTabConsole'			
			,tabDOM: '__bugliteTabDOM'
		}
		,labels: {
			version: 'Bug Lite 1.0.0'
		}
	}
	
	Buglite.layout = [	
	//status bar
	'<div id="{bugliteStatusbar}" class="bugliteStatusbar">',
		'<span class="statusPanel">',
			'<a href="javascript:$.buglite.open()">{version}<img class="off" src="img/open.gif" alt="open" /></a>',
		'</span>',
	'</div>',
	
	//Main
	'<div id="{bugliteWindow}" class="bugliteWindow">',
		//Top Menu
		'<div class="topContainer">',
			'<div class="tabs">控制台 Object</div>',
			'<a href="javascript:$.buglite.minimize()">-<img class="off" src="img/min.gif" alt="min" /></a> ',
			'<a href="javascript:$.buglite.maximize()">□<img class="off" src="img/min.gif" alt="min" /></a> ',
			'<a href="javascript:$.buglite.close()">×<img class="off" src="img/close.gif" alt="close" /></a> ',
		'</div>',
		//Console Tab
		'<div id="{tabConsole}">',
			'<div class="logPanel">',
				'<div class="commands">',
					'<a href="javascript:$.buglite.logClear()" class="command">清除</a> | ',
					'<a href="javascript:$.buglite.logFilter()" class="command">所有</a> ', 
					'<a href="javascript:$.buglite.logFilter(\'error\')" class="command">错误</a> ',
					'<a href="javascript:$.buglite.logFilter(\'warn\')" class="command">警告</a> ', 
					'<a href="javascript:$.buglite.logFilter(\'info\')" class="command">消息</a> ',
					'<a href="javascript:$.buglite.logFilter(\'debug\')" class="command">调试</a>',
				'</div>',
				'<div id="{logContainer}" class="logContainer"></div>',
			'</div>', 
			'<div class="scriptPanel">',  
				'<textarea id="{scriptContainer}" class="scriptContainer"></textarea>',
				'<div class="commands">',
					'<a href="javascript:$.buglite.script()" class="command">运行</a> ',
					'<a href="javascript:$.buglite.scriptClear()" class="command">清除</a> ',
				'</div>',
			'</div>', 
		'</div>', 
		//Object Tab
		'<div id="{tabDOM}" style="display:none">',
		'</div>',
	'</div>'].join('');
	
	Buglite.override = function(targetConsole){
		for(var k in targetConsole){
			window.console[k] = targetConsole[k];
		}
	}
	
	Buglite.deepClone = function (obj)
	{	
		if(obj instanceof Function)
		{
			var tmp=Function.prototype;
			Function.prototype=obj;
			var ret=(new Function(new String("return ")+obj))();
			Function.prototype=tmp;
			return ret;
		}
		else if(obj instanceof Array)
		{
			var tmp=Array.prototype;
			Array.prototype=obj;
			var ret=new Array();
			Array.prototype=tmp;
			return ret;
		}
		else if(obj instanceof Date)
		{
			var tmp=Date.prototype;
			Date.prototype=obj;
			var ret=new Date();
			ret.setTime(obj.getTime());
			Date.prototype=tmp;
			return ret;
		}
		else if( (obj instanceof String) || (obj instanceof Boolean) || (obj instanceof Number) )
		{
			return obj;
		}
		else
		{
			var constructor=function(){};
			constructor.prototype=obj;
			return new constructor;
		}
	}
	
	Buglite.console = {
		_log: function(msg){
			$.buglite.log(msg);
		},
		_empty: '<div class="empty">&lt;empty&gt;</div>',
		log: function(){
			this._log(arguments.length>0?'<div class="log">'+arguments[0]+'</div>':this._empty);
		},
		debug: function(){
			this._log(arguments.length>0?'<div class="debug">[D] '+arguments[0]+'</div>':this._empty);
		},
		info: function(){
			this._log(arguments.length>0?'<div class="info">[I] '+arguments[0]+'</div>':this._empty);
		},
		warn: function(){
			this._log(arguments.length>0?'<div class="warn">[W] '+arguments[0]+'</div>':this._empty);
		},
		error: function(){
			this._log(arguments.length>0?'<div class="error">[E] '+arguments[0]+'</div>':this._empty);
		},
		assert: function(exp, msg){
			if(!exp){
				this.error(msg);
			}
		},
		Buglite: 'Bug Lite 1.0.0',
		toString: function(){
			return this.Buglite;
		}
	};	
	
	/*!
		Buglite context initing
	*/
	// Store firebug's console
	if(typeof window.console !== 'undefined'){
		Buglite.firebugConsole = {};
		for(var k in window.console){
			Buglite.firebugConsole[k] = Buglite.deepClone(window.console[k]);
		}
	}
	else{
		window.console = {};
		Buglite.override(Buglite.console);
	}
	
	// Singleton Instance
	$.buglite = new Buglite();
})(jQuery);