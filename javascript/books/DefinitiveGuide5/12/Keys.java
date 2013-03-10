import javax.script.*;
import java.io.*;
import java.awt.event.*;
import javax.swing.*;

public class Keys {
    public static void main(String[] args) throws ScriptException, IOException
    {
        // Obtain an interpreter or "ScriptEngine" to run the script.
        ScriptEngineManager scriptManager = new ScriptEngineManager();
        ScriptEngine js = scriptManager.getEngineByExtension("js");

        // Evaluate the script.  We discard the result since we only
        // care about the function definitions in it.
	// The file listenter.js might contain code like this:
	// 
	//  function keyPressed(e) {
	//      print("key pressed: " + String.fromCharCode(e.getKeyChar()));
	//  }
	//  function keyReleased(e) { /* do nothing */ }
	//  function keyTyped(e) { /* do nothing */ }
	// 
        js.eval(new FileReader("listener.js"));

        // Cast to Invocable and get an object that implements KeyListener.
        Invocable invocable = (Invocable) js;
        KeyListener listener = invocable.getInterface(KeyListener.class);

        // Now use that KeyListener in a very simple GUI.
        JFrame frame = new JFrame("Keys Demo");
        frame.addKeyListener(listener);
        frame.setSize(200, 200);
        frame.setVisible(true);
    }
}
