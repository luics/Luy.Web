/*
 * luyutil Javascript Library v1.0.1
 * http://...
 * 
 * Copyright 2011, Xu Kai
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://.../license
 *
 *
 * Date: Tue Apr 05 17:00:00 2011 +0800
 *
 */
(function(){
    
    /**************************************************************
     *  Library Variables
     *
     *  Created: 2010-10-06
     *	Modified: 
     *    2011-03-27 window.$luyutil added
     *    2011-04-05 window.$common removed
     *    2011-04-05 debug() added
     *************************************************************/
    var $L = window.$L = window.$luyutil = window.luyutil = {};

    var _luyutil = {
        author: 'xukai',
        nick: 'luy',
        location: "Shanghai, China",
        email: "luics_king@live.cn",
        version: '1.0.1',
        debug: true
    };
	
    var debug = function(){
        return _luyutil.debug;
    };
   
    /**************************************************************
     *  Class Extension (Prototype style)
     *
     *  Created: 2011-04-05
     *	Modified: 
     *************************************************************/
    //<editor-fold defaultstate="collapsed" desc="ok"> 
    // Create a global object named 'Class'
    var Class = {
        // it has a single function that creates a new object constructor
        create: function() {
            // Create an anonymous object constructor
            return function() {
                // This calls its own initialization method
                this.initialize.apply(this, arguments);
            }
        },
        extend: function(destination, source) {
            // Go through all of the properties to extend
            for (var property in source) {
                // and add them to the destination object
                destination[property] = source[property];
            }

            // return the modified object
            return destination;
        },
        gen: function(properties){
            //call this function by Class.gen.call(this, properties);
            for ( var i in properties ) {
                (function(){
                    var p=i;
                    // Create a new getter for the property
                    this[ "get" + p ] = function() {
                        return properties[p];
                    };

                    // Create a new setter for the property
                    this[ "set" + p ] = function(val) {
                        properties[p] = val;
                    };
                }).apply(this); 
            }//for
        }
    }//Class

    // Add a static method to the Object object which copies
    // properties from one object to another    
    //    Object.prototype.extend = function(object) {
    //        return Object.extend.apply(this, [this, object]);
    //    } 
    //</editor-fold>
 
    /**************************************************************
     *  Class: Error
     *
     *  Created: 2010-10-06
     *	Modified: 
     *    2010-10-06
     *************************************************************/
    var Error = $L.Error = Class.create();
    Class.extend(Error.prototype, {
        initialize: function(message, name){
            this._message = message || 'Error';
            this._name = name || 'Unknow Category';
        },
        getName: function(){
            return this._name;
        },
        getMessage: function(){
            return this._message;
        },
        str: function(){
            return this._name + ': ' + this._message;            
        },
        toString: function(){
            return this.str();
        }
    });

    /**************************************************************
     *  Errors Variable 
     *
     *  Created: 2010-10-06
     *	Modified: 
     *    2011-03-27 Errors.notImplemented added
     *************************************************************/
    var Errors = $L.Errors = {
        singleton: new Error('The class is a singleton', 'Class Error'),
        notFound: new Error('No such class', 'Class Error'),
        notImplemented: new Error('Not Implemented', 'Class Error'),
        initialized: new Error('Has been initialized', 'Init Error'),
        ajaxNotSupport: new Error('Not Supported', 'AJAX Error')	
    };
    
    /**************************************************************
     *  Log Extension for Firebug
     * 
     *  Created: 2010-10-06
     *	Modified: 
     *    2011-03-27 debug mode added
     *    2011-04-05 anonymous function added
     *************************************************************/
    (function(){
        if(typeof(console) ===  "undefined"){ 
            window.console = {};
        }
    
        if(typeof(window.console.log) ===  "undefined"){ 
            window.console.log = function(){};
        }
    
        if(!debug()){
            window.console.log = function(){};
        }        
    })();

    /**************************************************************
     *  String Extension
     *  
     *  Created: 2010-1-29
     *	Modified: 
     *    2010-10-06
     *************************************************************/
    Class.extend(String.prototype, {
        rtrim: function(){
            return this.replace(/\s+$/,'');
        },
        ltrim: function(){
            return this.replace(/^\s+/,'');
        },
        trim: function(){
            return this.ltrim().rtrim();
        },
        format: function(){            
            // console.log(arguments.callee.toString());
            if(typeof $ === 'undefined' || typeof $.format === 'undefined'){
                //throw Errors.notImplemented;
                var res = this;
                for(var i=0; i < arguments.length; ++i){
                    //info(i + ':' + arguments[i]);
                    var re = new RegExp('\\{' + i + '\\}', 'g');
                    res = res.replace(re, arguments[i]);
                }
                return res;
            }
            else{
                // jQuery Plugin
                return $.format(this, arguments);
            }
        }
    });

    /**************************************************************
     *  Namespace: Event
     *
     *  Created: 2011-04-24
     *	Modified: 
     *************************************************************/
    var Event = $L.Event = {};
    
    /**************************************************************
     *  Event Extension
     *
     *  addEvent/removeEvent written by Dean Edwards, 2005
     *  with input from Tino Zijdel
     *  http://dean.edwards.name/weblog/2005/10/add-event/
     *
     *  Created: 2010-10-06
     *	Modified: 
     *    2011-03-27 removed
     *    2011-04-05 resume, by Dean Edwards
     *************************************************************/
    Class.extend(Event, {
        add: function (element, type, handler) {
            if(!Event.add.guid){
                // a counter used to create unique IDs
                Event.add.guid = 1;
            }
            
            // assign each event handler a unique ID
            if (!handler.$$guid) handler.$$guid = Event.add.guid++;
            // create a hash table of event types for the element
            if (!element.events) element.events = {};
            // create a hash table of event handlers for each element/event pair
            var handlers = element.events[type];
            if (!handlers) {
                handlers = element.events[type] = {};
                // store the existing event handler (if there is one)
                if (element["on" + type]) {
                    handlers[0] = element["on" + type];
                }
            }
            // store the event handler in the hash table
            handlers[handler.$$guid] = handler;
            // assign a global event handler to do all the work
            element["on" + type] = Event._handle;
        },
        remove: function (element, type, handler) {
            // delete the event handler from the hash table
            if (element.events && element.events[type]) {
                if(handler){
                    delete element.events[type][handler.$$guid];                    
                }
                else{
                    delete element.events[type];
                }
            }
        },
        _handle: function (event) {
            var returnValue = true;
            // grab the event object (IE uses a global event object)
            event = event || Event._fix(window.event); 
            // get a reference to the hash table of event handlers
            var handlers = this.events[event.type];
            // execute each event handler
            for (var i in handlers) {
                this.$$handleEvent = handlers[i];
                if (this.$$handleEvent(event) === false) {
                    returnValue = false;
                }
            }
            return returnValue;
        },
        _fix: function (event) {            
            // add W3C standard event methods
            event.preventDefault = Event._fix.preventDefault;
            event.stopPropagation = Event._fix.stopPropagation;
            return event;
        }
    });
    
    Class.extend(Event._fix, {
        preventDefault: function() {
            this.returnValue = false;
        },
        stopPropagation: function() {
            this.cancelBubble = true;
        }
    });
    
    // heavily based on the Quirksmode addEvent contest winner, John Resig
    // addEvent
    //    $L.addEvent = function(obj,type,fn){
    //	if(obj.addEventListener) obj.addEventListener(type,fn,false);
    //	else if(obj.attachEvent){
    //            obj["e"+type+fn] = fn;
    //            //console.log("e"+type+fn);
    //            obj[type+fn] = function(){obj["e"+type+fn](window.event);}
    //            obj.attachEvent("on"+type,obj[type+fn]);
    //	}
    //    }
    //------------------------------------
    // removeEvent
    //    $L.removeEvent = function(obj,type,fn){
    //	if(obj.removeEventListener) obj.removeEventListener(type,fn,false);
    //	else if(obj.detachEvent){
    //            obj.detachEvent("on"+type,obj[type+fn]);
    //            obj[type+fn] = null;
    //            obj["e"+type+fn] = null;
    //	}
    //    }

    /**************************************************************
     *  Namespace: Cookie
     *
     *  Created: 2011-04-24
     *	Modified: 
     *************************************************************/
    var Cookie = $L.Cookie = {};

    /**************************************************************
     *  Cookie Extension
     *
     *  Created: 2010-10-06
     *	Modified: 
     *    2011-03-27 debug mode added
     *************************************************************/
    Class.extend(Cookie, {
        set: function(key, value, expiredays, path, domain){
            value = value || '';
            expiredays = expiredays || 1;
            var exdate = new Date();
            exdate.setDate(exdate.getDate()+expiredays);
			
            document.cookie = key+ " = " +encodeURIComponent(value)
                + ";expires = "+exdate.toUTCString()
                + (path ? (";path = " + path)  : '')
                + (domain ? (";domain = " + domain) : '');
        },
        get: function(key){
            var start = document.cookie.indexOf(key+'=');
            if(start !==  -1){
                start +=  key.length+1;  
                var end = document.cookie.indexOf(';', start);
                if(end ===  -1){
                    end = document.cookie.length;
                }
                return decodeURIComponent(document.cookie.substring(start, end));
            }
			
            return null;
        },
        del: function(key){
            Cookie.set(key, '', -1);
        }
    });

    /**************************************************************
     *  Namespace: Dim
     *
     *  Created: 2011-04-05
     *	Modified: 2011-04-24 
     *************************************************************/
    var Dim = $L.Dim = {};
    
    Class.extend(Dim, {
        getViewportSize: function(){
            return new Dim.Size(this.getViewportWidth(), this.getViewportHeight());
        },
        getViewportWidth: function() {
            // Find the width of the viewport
            // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
            var de = document.documentElement;

            // If the innerWidth of the browser is available, use that
            return self.innerWidth ||
                // Otherwise, try to get the width off of the root node
            ( de && de.clientWidth ) ||
                // Finally, try to get the width off of the body element
            document.body.clientWidth;
        },
        getViewportHeight: function () {
            // Find the height of the viewport
            var de = document.documentElement;
            return self.innerHeight || ( de && de.clientHeight ) || document.body.clientHeight;
        },
        getCursorPoint: function(e) {
            // Normalize the event object
            e = e || window.event;

            // Check for the non-IE position, then the IE position, and finally return 0
            return new Dim.Point(e.pageX || e.clientX + document.body.scrollLeft || 0
            , e.pageY || e.clientY + document.body.scrollTop || 0);
        }
    });
            
    /**************************************************************
     *  Class: Dim.Size
     *
     *  Created: 2011-04-05
     *	Modified: 
     *************************************************************/
    Dim.Size = Class.create();
    Class.extend(Dim.Size.prototype, {
        initialize: function(width, height){
            this.setWidth(width);
            this.setHeight(height);
            //            Class.gen.call(this, {
            //                Width: width || 0,
            //                Height: height || 0
            //            });
        },
        getWidth: function(){
            return this._width;
        },
        getHeight: function(){
            return this._height;
        },
        setWidth: function(width){
            this._width = width || 0;
        },
        setHeight: function(height){
            this._height = height || 0;
        },
        toPoint: function(){
            return new Dim.Point(this.getWidth(), this.getHeight());
        },
        str: function(){
            return new String('[{0}, {1}]').format(this.getWidth(), this.getHeight());
        },
        toString: function(){
            return this.str();
        }
    });
            
    /**************************************************************
     *  Class: Dim.Rect
     *
     *  Created: 2011-04-24
     *	Modified: 
     *************************************************************/
    Dim.Rect = Class.create();
    Class.extend(Dim.Rect.prototype, {
        initialize: function(left, top, right, bottom){
            this.setLeft(left);
            this.setTop(top);
            this.setRight(right);
            this.setBottom(bottom);
        },
        getLeft: function(){
            return this._left;
        },
        getTop: function(){
            return this._top;
        },
        getRight: function(){
            return this._right;
        },
        getBottom: function(){
            return this._bottom;
        },
        setLeft: function(left){
            this._left = left || 0;
        },
        setTop: function(top){
            this._top = top || 0;
        },
        setRight: function(right){
            this._right = right || 0;
        },
        setBottom: function(bottom){
            this._bottom = bottom || 0;
        },
        getWidth: function(){
            return this.getRight() - this.getLeft();
        },
        getHeight: function(){
            return this.getBottom() - this.getTop();
        },
        toSize: function(){
            return new Dim.Size(this.getWidth(), this.getHeight());
        },
        str: function(){
            return new String('{{0}, {1}, {2}, {3}}').format(this.getLeft()
            , this.getTop(), this.getRight(), this.getBottom());
        },
        toString: function(){
            return this.str();
        }
    });
    
    /**************************************************************
     *  Class: Dim.Point
     *
     *  Created: 2011-04-05
     *	Modified: 
     *************************************************************/
    Dim.Point = Class.create();
    Class.extend(Dim.Point.prototype, {
        initialize: function(x, y){ 
            this.setX(x);
            this.setY(y);
        },
        getX: function(){
            return this._x;
        },
        getY: function(){
            return this._y;
        },
        setX: function(x){
            this._x = x || 0;
        },
        setY: function(y){
            this._y = y || 0;
        },
        toSize: function(){
            return new Dim.Size(this.getX(), this.getY());
        },
        str: function(){
            return new String('({0}, {1})').format(this.getX(), this.getY());
        },
        toString: function(){
            return this.str();
        }
    });
    // static members
    Class.extend(Dim.Point, {
        ORIGIN: new Dim.Point()
    });

    /**************************************************************
     *  Namespace: Util
     *
     *  Created: 2011-04-05
     *	Modified: 
     *************************************************************/
    var Util = $L.Util = {};
    
    /**************************************************************
     *  Class: StringBuilder
     *
     *  Created: 2010-01-29
     *	Modified: 
     *    2010-10-06
     *    2011-04-05 class refactor
     *************************************************************/
    Util.StringBuilder = Class.create();
    Class.extend(Util.StringBuilder.prototype, {
        initialize: function(){
            this._string = [];
            if(arguments.length >=  1){ 
                this._string[0] = arguments[0];
            }
        },
        append: function(msg){
            msg = msg || "";
            if(msg !==  ""){
                this._string.push(msg);
            }
            return this;
        },
        appendLine: function(msg, end){
            end = end || "<br/>";
            return this.append(msg+end);
        },
        str: function(){
            return this._string.join("");            
        },
        toString: function(){
            return this.str();
        }
    });
    
    /**************************************************************
     *  Class: Hashtable
     *
     *  Created: 2010-1-29
     *	Modified: 
     *    2010-10-06 
     *    2011-03-27 toString method is added
     *    2011-04-05 class refactor
     *************************************************************/
    Util.Hashtable = Class.create();
    Class.extend(Util.Hashtable.prototype, {
        initialize: function(){
            this._hash = {};
            this._count = 0;
        },
        contains: function(key) {
            var origin = {};
            return (typeof(this._hash[key]) !== 'undefined'
                && (typeof(origin[key]) === 'undefined' || origin[key] === origin.prototype[key]));
        },
        add: function(key, value)
        {
            if(!this.contains(key)){
                ++this._count;
            }
            this._hash[key] = value;
            return this;
        },
        remove: function(key) {
            if(this.contains(key)){
                delete this._hash[key];
                --this._count;
            }
        },
        count: function() {
            return this._count;
        },
        item: function(key) {
            if (this.contains(key)){
                return this._hash[key];
            }
            
            return null;
        },
        clear: function() {
            this._hash = {};
            this._count = 0;
        },
        str: function(){
            var sb = new Util.StringBuilder();
            sb.append('{');
            var i = 0;
            var key;
            for(key in this._hash){
                if(!this.contains(key)){
                    continue;
                }
                    
                sb.append(key);
                sb.append(': ');
                if(this._hash[key].constructor === Function){
                    sb.append('function');
                }
                else{
                    sb.append(this._hash[key]);
                }
                    
                if(i++ < this._count-1){
                    sb.append(', ');
                }
            }
            sb.append('}');
            return sb.str();
        },
        toString: function(){
            return this.str();
        }
    });



    /**************************************************************
     *  Class: Util.Pager
     *
     *  Created: 2011-04-06
     *	Modified:
     *************************************************************/
    Util.Pager = Class.create();
    // static members
    Class.extend(Util.Pager, {
        PAGE: 'page',
        pager: function (conId, page, count){
            var container = document.getElementById(conId);
            if(count<=1){
                if(container){
                    container.style.$display = container.style.display;
                    container.style.display='none';
                }
                return;
            }
            var p=new Util.StringBuilder('<input type="hidden" name="{1}" id="{1}" value="{0}" />'.format(page, Util.Pager.PAGE));
            var sel=new Util.StringBuilder();
            var atlp='<a href="javascript:$L.Util.Pager.submit({0})">{1}</a>&nbsp;';

            //prev
            if(page > 0){
                p.append(atlp.format(0, '\u9996\u9875'));
                p.append(atlp.format(page-1, '\u524d\u4e00\u9875'));
            }

            //main
            sel.append('&nbsp;&nbsp;\u81f3: <select onchange="$L.Util.Pager.submit(this.value)">');
            for(var i=0; i<count; ++i){
                if(page==i){
                    p.append('<b>{0}</b>&nbsp;'.format(i+1));
                    sel.append('<option value="{0}" selected="selected">{1}</option>'.format(i, i+1));
                }
                else{
                    p.append(atlp.format(i, i+1));
                    sel.append('<option value="{0}">{1}</option>'.format(i, i+1));
                }
            }
            sel.append('</select>');

            //next
            if(page < count-1){
                p.append(atlp.format(page+1, '\u540e\u4e00\u9875'));
                p.append(atlp.format(count-1, '\u5c3e\u9875'));
            }

            if(container){
                container.innerHTML = p.str() + sel.str();
                container.style.display = container.style.$display || '';
            }
        },        
        submit: function(page){
            console.log('page: '+page);
            document.getElementById(Util.Pager.PAGE).value = page;

            //            var fs=document.getElementsByTagName('form');
            //            for(var i=0; i< fs.length; ++i){
            //                console.log(fs[i]);
            //                fs[i].submit();
            //            }

            var fs=document.getElementsByTagName('input');
            for(var i=0; i< fs.length; ++i){
                if(!fs[i].getAttribute('type') || fs[i].getAttribute('type').toLowerCase()!=='submit'){
                    continue;
                }

                console.log(fs[i]);
                fs[i].click();
            } 
        }
    });
    //END
})();
