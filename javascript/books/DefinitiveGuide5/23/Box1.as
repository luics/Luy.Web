/**
 * Box.as: ActionScript code to demonstrate JavaScript <-> Flash communication
 *
 * This file is written in ActionScript 2.0, a language that is based on
 * JavaScript, but extended for stronger object-oriented programming.
 * All we're doing here is defining a single static function named main()
 * in a class named Box.
 * 
 * You can compile this code with the open source ActionScript compiler mtasc
 * using a command like this:
 *
 *   mtasc -header 300:300:1 -main -swf Box1.swf Box1.as
 *
 * mtasc produces a SWF file that invokes the main() method from the first
 * frame of the movie. If you use the Flash IDE, you must insert your own
 * call to Box.main() in the first frame.
 */
class Box {
    static function main() {
        // This is an ActionScript function we want to use from JavaScript.
        // It draws a box and returns the area of the box.
        var drawBox = function(x,y,w,h) {
            _root.beginFill(0xaaaaaa, 100);
            _root.lineStyle(5, 0x000000, 100);
            _root.moveTo(x,y);
            _root.lineTo(x+w, y);
            _root.lineTo(x+w, y+h);
            _root.lineTo(x, y+h);
            _root.lineTo(x,y);
            _root.endFill();
            return w*h;
        }
        
        // Here's how we can allow the function to be invoked from JavaScript
        // prior to Flash 8.  First, we define properties in our root timeline
        // to hold the function arguments and return value.
        _root.arg1 = 0;     
        _root.arg2 = 0;
        _root.arg3 = 0;
        _root.arg4 = 0;
        _root.result = 0;

        // Then we define another property with the same name as the function.
        _root.drawBox = 0;

        // Now we use the Object.watch() method to "watch" this property.
        // Whenever it is set, the function we specify will be called.
        // This means that JavaScript code can use SetVariable to trigger
        // a function invocation.
        _root.watch("drawBox",    // The name of the property to watch
                    function() {  // The function to invoke when it changes
                        // Call the drawBox() function, converting the
                        // arguments from strings to numbers, and storing
                        // the return value.
                        _root.result = drawBox(Number(_root.arg1),
                                               Number(_root.arg2),
                                               Number(_root.arg3),
                                               Number(_root.arg4));

                        // Return 0 so that the value of the property we
                        // are watching does not change.
                        return 0;
                    });
        
        
        // This is an ActionScript event handler.
        // It calls the global fscommand() function to pass the 
        // coordinates of a mouse click to JavaScript.
        _root.onMouseDown = function() {
            fscommand("mousedown", _root._xmouse + "," + _root._ymouse);
        }
        
        // Here we use fscommand() again to tell JavaScript that the 
        // Flash movie has loaded and is ready to go.
        fscommand("loaded", "");
    }
}
