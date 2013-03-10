/**
 * PObject.js: JavaScript objects that persist across browser sessions and may
 *   be shared by web pages within the same directory on the same host.
 *
 * This module defines a PObject() constructor to create a persistent object.
 * PObject objects have two public methods.  save() saves, or "persists" the
 * current properties of the object, and forget() deletes the persistent
 * properties of the object.  To define a persistent property in a PObject,
 * simply set the property on the object as if it were a regular JavaScript
 * object and then call the save() method to save the current state of 
 * the object.  You may not use "save" or "forget" as a property name, nor
 * any property whose name begins with $. PObject is intended for use with
 * property values of type string.  You may also save properties of type 
 * boolean and number, but these will be converted to strings when retrieved.
 * 
 * When a PObject is created, the persistent data is read and stored in the
 * newly created object as regular JavaScript properties, and you can use the
 * PObject just as you would use a regular JavaScript object.  Note, however
 * that persistent properties may not be ready when the PObject() constructor
 * returns, and you should wait for asynchronous notification using an onload
 * handler function that you pass to the constructor.
 *
 * Constructor:
 *    PObject(name, defaults, onload):
 * 
 * Arguments:
 *
 *    name       A name that identifies this persistent object. A single pages
 *               can have more than one PObject, and PObjects are accessible
 *               to all pages within the same directory, so this name should
 *               be unique within the directory. If this argument is null or
 *               is not specified, the filename (but not directory) of the
 *               containing web page is used.
 * 
 *    defaults   An optional JavaScript object. When no saved value for the
 *               persistent object can be found (which happens when a PObject
 *               is created for the first time), the properties of this object
 *               are copied into the newly created PObject.
 *
 *    onload     The function to call (asynchronously) when persistent values
 *               have been loaded into the PObject and are ready for use.
 *               This function is invoked with two arguments: a reference
 *               to the PObject and the PObject name.  This function is
 *               called *after* the PObject() constructor returns.  PObject
 *               properties should not be used before this.
 *
 * Method PObject.save(lifetimeInDays):
 *   Persist the properties of a PObject.  This method saves the properties of
 *   the PObject, ensuring that they persist for at least the specified
 *   number of days.  
 *
 * Method PObject.forget():
 *   Delete the properties of the PObject.  Then save this "empty" PObject to
 *   persistent storage and, if possible, cause the persistent store to expire.
 *
 * Implementation Notes:
 * 
 * This module defines a single PObject API but provides three distinct
 * implementations of that API. In Internet Explorer, the IE-specific
 * "UserData" persistence mechanism is used.  On any other browser that has a
 * Macromedia Flash plugin, the Flash SharedObject persistence mechanism is
 * used. Browsers that are not IE and do not have Flash available fall back on
 * a cookie-based implementation. Note that the Flash implementation does not
 * support expiration dates for saved data, so data stored with that
 * implementation persists until deleted.
 *
 * Sharing of PObjects:
 *
 * Data stored with a PObject on one page is also available to other pages
 * within the same directory of the same web server. When the cookie 
 * implementation is used, pages in subdirectories can read (but not write)
 * the properties of PObjects created in parent directories. When the Flash
 * implementation is used, any page on the web server can access the shared
 * data if it cheats and uses a modified version of this module.
 * 
 * Distinct web browser applications store their cookies separately and 
 * persistent data stored using cookies in one browser is not accessible using
 * a different browser.  If two browsers both use the same installation of
 * the Flash plugin, however, these browsers may share persistent data stored
 * with the Flash implementation.
 * 
 * Security Notes:
 *
 * Data saved through a PObject is stored unencrypted on the user's hard disk.
 * Applications running on the computer can access the data, so PObject is
 * not suitable for storing sensitive information such as credit card numbers,
 * passwords, or financial account numbers.
 */

// This is the constructor
function PObject(name, defaults, onload) {
    if (!name) { // If no name was specified, use the last component of the URL
        name = window.location.pathname;
        var pos = name.lastIndexOf("/");
        if (pos != -1) name = name.substring(pos+1);
    }
    this.$name = name;  // Remember our name

    // Just delegate to a private, implementation-defined $init() method.
    this.$init(name, defaults, onload);
} 

// Save the current state of this PObject for at least the specified # of days.
PObject.prototype.save = function(lifetimeInDays) {
    // First serialize the properties of the object into a single string
    var s = "";                           // Start with empty string
    for(var name in this) {               // Loop through properties
        if (name.charAt(0) == "$") continue;  // Skip private $ properties
        var value = this[name];               // Get property value
        var type = typeof value;              // Get property type
        // Skip properties whose type is object or function
        if (type == "object" || type == "function") continue;
        if (s.length > 0) s += "&";           // Separate properties with &
        // Add property name and encoded value
        s += name + ':' + encodeURIComponent(value);
    }

    // Then delegate to a private implementation-defined method to actually
    // save that serialized string.
    this.$save(s, lifetimeInDays);
};

PObject.prototype.forget = function() {
    // First, delete the serializable properties of this object using the
    // same property selection criteria as the save() method.
    for(var name in this) {
        if (name.charAt(0) == '$') continue;
        var value = this[name];
        var type = typeof value;
        if (type == "function" || type == "object") continue;
        delete this[name];  // Delete the property
    }

    // Then erase and expire any previously saved data by saving the 
    // empty string and setting its lifetime to 0.
    this.$save("", 0);
};

// Parse the string s into name/value pairs and set them as properties of this.
// If the string is null or empty, copy properties from defaults instead
// This private utility method is used by the implementations of $init() below.
PObject.prototype.$parse = function(s, defaults) {
    if (!s) {  // If there is no string, use default properties instead
        if (defaults) for(var name in defaults) this[name] = defaults[name];
        return;
    }

    // The name/value pairs are separated from each other by ampersands, and
    // the individual names and values are separated from each other by colons.
    // We use the split() method to parse everything.
    var props = s.split('&'); // Break it into an array of name/value pairs
    for(var i = 0; i < props.length; i++) { // Loop through name/value pairs
        var p = props[i];
        var a = p.split(':');     // Break each name:value pair at the colon
        this[a[0]] = decodeURIComponent(a[1]); // Decode and store property
    }
};

/* 
 * The implementation-specific portion of the module is below.
 * For each implementation, we define an $init() method that loads 
 * persistent data and a $save() method that saves it.
 */ 

// Determine if we're in IE, and, if not, whether we've got a Flash
// plugin installed and whether it has a high enough version number
var isIE = navigator.appName == "Microsoft Internet Explorer";
var hasFlash7 = false;
if (!isIE && navigator.plugins) { // If we use the Netscape plugin architecture
   var flashplayer = navigator.plugins["Shockwave Flash"];
   if (flashplayer) {    // If we've got a Flash plugin
       // Extract the version number
       var flashversion = flashplayer.description; 
       var flashversion = flashversion.substring(flashversion.search("\\d"));
       if (parseInt(flashversion) >= 7) hasFlash7 = true;
   }
}

if (isIE) {  // If we're in IE
    // The PObject() constructor delegates to this initialization function
    PObject.prototype.$init = function(name, defaults, onload) {
        // Create a hidden element with the userData behavior to persist data
        var div = document.createElement("div");  // Create a <div> tag
        this.$div = div;                          // Remember it
        div.id = "PObject" + name;                // Name it
        div.style.display = "none";               // Make it invisible

        // This is the IE-specific magic that makes persistence work.
        // The "userData" behavior adds the getAttribute(), setAttribute(),
        // load() and save() methods to this <div> element. We use them below.
        div.style.behavior = "url('#default#userData')";  

        document.body.appendChild(div);  // Add the element to the document

        // Now we retrieve any previously saved persistent data.
        div.load(name);  // Load data stored under our name
        // The data is a set of attributes.  We only care about one of these
        // attributes.  We've arbitrarily chosen the name "data" for it.
        var data = div.getAttribute("data");

        // Parse the data we retrieved, breaking it into object properties
        this.$parse(data, defaults);

        // If there is an onload callback, arrange to call it asynchronously
        // once the PObject() constructor has returned.
        if (onload) {
            var pobj = this;  // Can't use "this" in the nested function
            setTimeout(function() { onload(pobj, name);}, 0);
        }
    }

    // Persist the current state of the persistent object
    PObject.prototype.$save = function(s, lifetimeInDays) {
        if (lifetimeInDays) { // If lifetime specified, convert to expiration
            var now = (new Date()).getTime();
            var expires = now + lifetimeInDays * 24 * 60 * 60 * 1000;
            // Set the expiration date as a string property of the <div>
            this.$div.expires = (new Date(expires)).toUTCString();
        }

        // Now save the data persistently
        this.$div.setAttribute("data", s); // Set text as attribute of the <div>
        this.$div.save(this.$name);        // And make that attribute persistent
    };
}
else if (hasFlash7) { // This is the Flash-based implementation
    PObject.prototype.$init = function(name, defaults, onload) {
        var moviename = "PObject_" + name;    // id of the <embed> tag
        var url = "PObject.swf?name=" + name; // url of the movie file

        // When the Flash player has started up and has our data ready,
        // it notifies us with an FSCommand.  We must define a
        // handler that is called when that happens
        var pobj = this;  // for use by the nested function
        // Flash requires that we name our function with this global symbol
        window[moviename + "_DoFSCommand"] = function(command, args) {
            // We know Flash is ready now, so query it for our persistent data
            var data =  pobj.$flash.GetVariable("data")
            pobj.$parse(data, defaults);    // Parse data or copy defaults
            if (onload) onload(pobj, name); // Call onload handler, if any
        };

        // Create an <embed> tag to hold our Flash movie.  Using an <object>
        // tag is more standards-compliant, but it seems to cause problems
        // receiving the FSCommand.  Note that we'll never be using Flash with
        // IE, which simplifies things quite a bit.
        var movie = document.createElement("embed");  // element to hold movie
        movie.setAttribute("id", moviename);          // element id
        movie.setAttribute("name", moviename);        // and name
        movie.setAttribute("type", "application/x-shockwave-flash"); 
        movie.setAttribute("src", url);  // This is the URL of the movie
        // Make the movie inconspicuous at the upper-right corner
        movie.setAttribute("width", 1);  // If this is 0, it doesn't work.
        movie.setAttribute("height", 1);
        movie.setAttribute("style", "position:absolute; left:0px; top:0px;");

        document.body.appendChild(movie);  // Add the movie to the document
        this.$flash = movie;               // And remember it for later
    };

    PObject.prototype.$save = function(s, lifetimeInDays) {
        // To make the data persistent, we simply set it as a variable on
        // the Flash movie.  The ActionScript code in the movie persists it.
        // Note that Flash persistence does not support lifetimes.
        this.$flash.SetVariable("data", s); // Ask Flash to save the text
    };
}
else { /* If we're not IE and don't have Flash 7, fall back on cookies */
    PObject.prototype.$init = function(name, defaults, onload) {
        var allcookies = document.cookie;             // Get all cookies
        var data = null;                              // Assume no cookie data
        var start = allcookies.indexOf(name + '=');   // Look for cookie start
        if (start != -1) {                            // Found it
            start += name.length + 1;                 // Skip cookie name
            var end = allcookies.indexOf(';', start); // Find end of cookie
            if (end == -1) end = allcookies.length;
            data = allcookies.substring(start, end);  // Extract cookie data
        }
        this.$parse(data, defaults);  // Parse the cookie value to properties
        if (onload) {                 // Invoke onload handler asynchronously
            var pobj = this;
            setTimeout(function() { onload(pobj, name); }, 0);
        }
    };

    PObject.prototype.$save = function(s, lifetimeInDays) {
        var cookie = this.$name + '=' + s;          // Cookie name and value
        if (lifetimeInDays != null)                 // Add expiration
            cookie += "; max-age=" + (lifetimeInDays*24*60*60);
        document.cookie = cookie;                   // Save the cookie
    };
}
