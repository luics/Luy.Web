import java.applet.*;
import java.awt.*;
import java.awt.geom.*;
import java.awt.image.*;

/**
 * This simple applet does nothing by itself: it simply exports an API
 * for the use of client-side JavaScript code.
 */
public class Canvas extends Applet {
    BufferedImage image;  // We draw into this offscreen image
    Graphics2D g;         // using this graphics context

    // The browser calls this method to initialize the applet
    public void init() {
        // Find out how big the applet is and create an offscreen image
        // that size.
        int w = getWidth(); 
        int h = getHeight();
        image = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
        // Get a graphics context for drawing into the image
        g = image.createGraphics();
        // Start with a pure white background
        g.setPaint(Color.WHITE);
        g.fillRect(0, 0, w, h);
        // Turn on antialiasing
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                           RenderingHints.VALUE_ANTIALIAS_ON);
    }

    // The browser automatically calls this method when the applet needs
    // to be redrawn.  We copy the offscreen image onscreen.
    // JavaScript code drawing to this applet must call the inherited
    // repaint() method to request a redraw.
    public void paint(Graphics g) { g.drawImage(image, 0, 0, this); }

    // These methods set basic drawing parameters
    // This is just a subset: the Java2D API supports many others
    public void setLineWidth(float w) { g.setStroke(new BasicStroke(w)); }
    public void setColor(int color) { g.setPaint(new Color(color)); }
    public void setFont(String fontfamily, int pointsize) {
        g.setFont(new Font(fontfamily, Font.PLAIN, pointsize));
    }

    // These are simple drawing primitives
    public void fillRect(int x, int y, int w, int h) { g.fillRect(x,y,w,h); }
    public void drawRect(int x, int y, int w, int h) { g.drawRect(x,y,w,h); }
    public void drawString(String s, int x, int y) { g.drawString(s, x, y); }
    
    // These methods fill and draw arbitrary shapes
    public void fill(Shape shape) { g.fill(shape); }
    public void draw(Shape shape) { g.draw(shape); }

    // These methods return simple Shape objects
    // This is just a sampler.  The Java2D API supports many others
    public Shape createRectangle(double x, double y, double w, double h) {
        return new Rectangle2D.Double(x, y, w, h);
    }
    public Shape createEllipse(double x, double y, double w, double h) {
        return new Ellipse2D.Double(x, y, w, h);
    }
    public Shape createWedge(double x, double y, double w, double h,
                             double start, double extent) {
        return new Arc2D.Double(x, y, w, h, start, extent, Arc2D.PIE);
    }
}
