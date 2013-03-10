/**
 * Box2.as: ActionScript code to demonstrate JavaScript <-> Flash communication
 *          using the ExternalInterface class of Flash 8.
 *
 * Compile this code using mtasc with a command like this:
 *
 *   mtasc -version 8 -header 300:300:1 -main -swf Box2.swf Box2.as
 *
 * If you use the Flash IDE instead, insert a call to Box.main() in the
 * first frame of your movie.
 */
import flash.external.ExternalInterface;

class Box {
    static function main() {
        // Use the new External Interface to export our ActionScript function.
        // This makes it very easy to invoke the function from JavaScript,
        // but it is only supported by Flash 8 and later.
        // First argument of addCallback is the name by which the function
        // will be known in JavaScript.  The second argument is the 
        // ActionScript object on which the function will be invoked.  It
        // will be the value of the 'this' keyword.  And the third argument
        // is the function that will be called.
        ExternalInterface.addCallback("drawBox", null, function(x,y,w,h) {
                                          _root.beginFill(0xaaaaaa, 100);
                                          _root.lineStyle(5, 0x000000, 100);
                                          _root.moveTo(x,y);
                                          _root.lineTo(x+w, y);
                                          _root.lineTo(x+w, y+h);
                                          _root.lineTo(x, y+h);
                                          _root.lineTo(x,y);
                                          _root.endFill();
                                          return w*h;
                                      });
        
        // This is an ActionScript event handler.
        // Tell JavaScript about mouse clicks using ExternalInterface.call().
        _root.onMouseDown = function() {
            ExternalInterface.call("reportMouseClick",
                                   _root._xmouse, _root._ymouse);
        }
        
        // Tell JavaScript that we're fully loaded and ready to be scripted
        ExternalInterface.call("flashReady");
    }
}
