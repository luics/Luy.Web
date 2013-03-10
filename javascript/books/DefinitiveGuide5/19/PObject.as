class PObject {
    static function main() {
        // SharedObject exists in Flash 6 but isn't protected against
        // cross-domain scripting until Flash 7, so make sure we've got
        // that version of the Flash player
        var version = getVersion();
        version = parseInt(version.substring(version.lastIndexOf(" ")));
        if (isNaN(version) || version < 7) return;

        // Create a SharedObject to hold our persistent data.
        // The name of the object is passed in the movie URL like this:
        // PObject.swf?name=name
        _root.so = SharedObject.getLocal(_root.name);

        // Retrieve the initial data and store it on _root.data
        _root.data = _root.so.data.data;

        // Watch the data variable.  When it changes, persist its new value
        _root.watch("data", function(propName, oldValue, newValue) {
                     _root.so.data.data = newValue;
                     _root.so.flush();
                 });

        // Notify JavaScript that it can retrieve the persistent data now
        fscommand("init");
    }
}
