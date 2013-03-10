import javax.script.*;
import java.util.*;
import java.io.*;

/**
 * This class is like java.util.Properties but allows property values to
 * be determined by evaluating JavaScript expressions.
 */
public class Configuration {
    // Here is where we store name/value pairs of defaults.
    Map<String,Object> defaults = new HashMap<String,Object>();

    // Accessors for getting and setting values in the map
    public Object get(String key) { return defaults.get(key); }
    public void put(String key, Object value) { defaults.put(key, value); }

    // Initialize the contents of the Map from a file of name:value pairs.
    // If a value is enclosed in curly braces, evaluate it as JavaScript.
    public void load(String filename) throws IOException, ScriptException {
        // Get a JavaScript interpreter.
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByExtension("js");

        // Use our own name/value pairs as JavaScript variables.
        Bindings bindings = new SimpleBindings(defaults);

        // Create a context for evaluating scripts.
        ScriptContext context = new SimpleScriptContext();

        // Set those Bindings in the Context so that they are readable
        // by the scripts but so that variables defined by the scripts do
        // not get placed into our Map object.
        context.setBindings(bindings, ScriptContext.GLOBAL_SCOPE);

        BufferedReader in = new BufferedReader(new FileReader(filename));
        String line;
        while((line = in.readLine()) != null) {
            line = line.trim();  // strip leading and trailing space
            if (line.length() == 0) continue;    // skip blank lines
            if (line.charAt(0) == '#') continue; // skip comments
            
            int pos = line.indexOf(":");
            if (pos == -1)
                throw new IllegalArgumentException("syntax: " + line);
            
            String name = line.substring(0, pos).trim();
            String value = line.substring(pos+1).trim();
            char firstchar = value.charAt(0);
            int len = value.length();
            char lastchar = value.charAt(len-1);

            if (firstchar == '"' && lastchar == '"') {
                // Double-quoted quoted values are strings
                defaults.put(name, value.substring(1, len-1));
            }
            else if (Character.isDigit(firstchar)) {
                // If it begins with a number try to parse a number
                try {
                    double d = Double.parseDouble(value);
                    defaults.put(name, d);
                }
                catch(NumberFormatException e) {
                    // Oops.  Not a number.  Store as a string
                    defaults.put(name, value); 
                }
            }
            else if (value.equals("true"))         // handle boolean values
                defaults.put(name, Boolean.TRUE);
            else if (value.equals("false"))
                defaults.put(name, Boolean.FALSE);
            else if (value.equals("null"))
                defaults.put(name, null);
            else if (firstchar == '{' && lastchar == '}') {
                // If the value is in curly braces, evaluate as JavaScript code
                String script = value.substring(1, len-1);
                Object result = engine.eval(script, context);
                defaults.put(name, result);
            }
            else {
                // In the default case, just store the value as a string.
                defaults.put(name, value);
            }
        }
    }

    // A simple test program for the class
    public static void main(String[] args) throws IOException, ScriptException
    {
        Configuration defaults = new Configuration();
        defaults.load(args[0]);
        Set<Map.Entry<String,Object>> entryset = defaults.defaults.entrySet();
        for(Map.Entry<String,Object> entry : entryset) {
            System.out.printf("%s: %s%n", entry.getKey(), entry.getValue());
        }
    }
}
