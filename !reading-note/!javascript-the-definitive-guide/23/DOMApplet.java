import java.applet.Applet;          // The Applet class itself
import com.sun.java.browser.dom.*;  // The Common DOM API
import org.w3c.dom.*;               // The W3C core DOM API
import org.w3c.dom.css.*;           // The W3C CSS DOM API

// This applet does nothing on its own. It simply defines a method for 
// JavaScript code to call.  That method then uses the Common DOM API to
// manipulate the document in which the applet is embedded.
public class DOMApplet extends Applet {
    // Set the background of the element with the specified id to the 
    // specified color.
    public void setBackgroundColor(final String id, final String color)
        throws DOMUnsupportedException, DOMAccessException
    {
        // We start with a DOMService object, which we obtain like this
        DOMService service = DOMService.getService(this);

        // Then we call invokeAndWait() on the DOMService, passing a DOMAction
        service.invokeAndWait(new DOMAction() {
                // The DOM code we want to execute is in the run() method
                public Object run(DOMAccessor accessor) {
                    // We use the DOMAccessor to get the Document object
                    // Note that we pass the applet object as an argument.
                    Document d = accessor.getDocument(DOMApplet.this);

                    // Get the element we want to manipulate
                    Element e = d.getElementById(id);

                    // Cast the element to an ElementCSSInlineStyle so we can
                    // call its getStyle() method. Then cast the return value
                    // of that method to a CSS2Properties object.
                    CSS2Properties style =
                        (CSS2Properties) ((ElementCSSInlineStyle)e).getStyle();

                    // Finally, we can set the backgroundColor property
                    style.setBackgroundColor(color);

                    // A DOMAction can return a value, but this one doesn't
                    return null;
                }
            });
    }
}
