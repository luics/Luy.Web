import flash.external.ExternalInterface;

class Canvas {
    // The open source mtasc ActionScript compiler automatically invokes
    // this main() method in the compiled .swf file it produces. If you use
    // the Flash IDE to create a Canvas.swf file, you'll need to call
    // Canvas.main() from the first frame of the movie instead.
    static function main() { var canvas = new Canvas(); }

    // This constructor contains initialization code for our Flash Canvas
    function Canvas() {
        // Specify resize behavior for the canvas
        Stage.scaleMode = "noScale";
        Stage.align = "TL";

        // Now simply export the functions of the Flash drawing API
        ExternalInterface.addCallback("beginFill", _root, _root.beginFill);
        ExternalInterface.addCallback("beginGradientFill", _root,
                                      _root.beginGradientFill);
        ExternalInterface.addCallback("clear", _root, _root.clear);
        ExternalInterface.addCallback("curveTo", _root, _root.curveTo);
        ExternalInterface.addCallback("endFill", _root, _root.endFill);
        ExternalInterface.addCallback("lineTo", _root, _root.lineTo);
        ExternalInterface.addCallback("lineStyle", _root, _root.lineStyle);
        ExternalInterface.addCallback("moveTo", _root, _root.moveTo);

        // Also export the addText() function below
        ExternalInterface.addCallback("addText", null, addText);
    }

    static function addText(text, x, y, w, h, depth, font, size) {
        // Create a TextField object to display text at the specified location
        var tf = _root.createTextField("tf", depth, x, y, w, h);
        // Tell it what text to display
        tf.text = text;
        // Set the font family and point size for the text
        var format = new TextFormat();
        format.font = font;
        format.size = size;
        tf.setTextFormat(format);
    }
}
