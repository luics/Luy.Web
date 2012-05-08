import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

class Spider {
	private static final String M = "-m";
	private static final String T = "-t";
	private static final String D = "-d";
	private static final String H = "-?";
	private static final String V = "-v";
	private static int connection = 100;
	// private static int maxThread = 500;
	// private static final int MIN_PER_THREAD = 10;
	private static boolean verbose;
	private static String node = "node";
	private static String message;
	private static final String VERSION = "0.1.0";
	private static final String WELCOME = String.format("Spider Emulator, by Luy (luics.king@gmail.com)\n%s", VERSION);

	private static String httpGet(String paramString) throws IOException {
		URL url = new URL(paramString);
		BufferedReader bufr = null;
		StringBuilder res = new StringBuilder();
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();

		conn.setConnectTimeout(90000);
		conn.setReadTimeout(90000);
		conn.connect();

		bufr = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String str;
		while ((str = bufr.readLine()) != null) {
			res.append(str);
		}

		if (bufr != null) {
			bufr.close();
		}

		return res.toString();
	}

	public static void main(String[] args) throws IOException {
		StringBuilder HELP = new StringBuilder();
		Map<String, String> params = new HashMap<String, String>();
		params.put(T, "Target: node/php");
		params.put(D, "display all info");
		params.put(V, "Version");
		params.put(H, "Help information");
		params.put(M, "Message");

		HELP.append(String.format("\n%s\n\nUsage:\njava Spider http-conn-num [options]", WELCOME));
		Iterator<String> itor = params.keySet().iterator();
		while (itor.hasNext()) {
			String key = itor.next();
			HELP.append(String.format("%s\t%s\n", key, params.get(key)));
		}

		try {
			ArrayList<String> arglist = new ArrayList<String>();
			for (String arg : args) {
				arglist.add(arg.toLowerCase());
			}

			if (arglist.contains(V)) {
				System.out.println("0.1.0");
				return;
			}

			if ((arglist.isEmpty()) || (arglist.contains(H))) {
				System.out.println(HELP);
				return;
			}

			connection = Integer.parseInt((String) arglist.get(0));
			verbose = arglist.contains(D);
			message = arglist.get(arglist.indexOf(M) + 1);
			if (arglist.contains(T))
				node = arglist.get(arglist.indexOf(T) + 1);
		} catch (Exception localException) {
			System.out.println(localException);
			System.out.println(HELP);
			return;
		}

		System.out.println(new StringBuilder().append("Target: ").append(node).toString());

		String targetNode = "http://localhost:8000/?m=" + message;
		String targetPhp = "http://localhost:80/target.php?m=" + message;
		final String target = node.equals("node") ? targetNode : targetPhp;

		final int thread;
		if (connection < 100) {
			thread = 1;
		} else if (connection < 1000) {
			thread = 10;
		} else if (connection < 10000) {
			thread = 50;
		} else {
			thread = 250;
		}

		for (int i = 0; i < thread; ++i) {
			final int connPerThread;
			if (i == thread - 1) {
				connPerThread = connection - (connection / thread) * (thread - 1);
			} else {
				connPerThread = connection / thread;
			}

			final int index = i;
			new Thread() {
				public void run() {
					for (int j = 0; j < connPerThread; j += 1) {
						try {
							String str = httpGet(target);
							if (Spider.verbose) {
								System.out.println(String.format("[%d] %s", index * thread + j, str));
							}
						} catch (Exception localException) {
							System.err.println(localException);
						}
					}
				}
			}.start();
		}
	}
}