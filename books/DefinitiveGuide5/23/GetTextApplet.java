import java.applet.Applet;
import java.net.URL;
import java.io.*;

public class GetTextApplet extends Applet {
    public String getText(String url)
        throws java.net.MalformedURLException, java.io.IOException
    {
        URL resource = new URL(this.getDocumentBase(), url);
        InputStream is = resource.openStream();
        BufferedReader in = new BufferedReader(new InputStreamReader(is));
        StringBuilder text = new StringBuilder();
        String line;
        while((line = in.readLine()) != null) {
            text.append(line);
            text.append("\n");
        }
        in.close();
        return text.toString();
    }
}
