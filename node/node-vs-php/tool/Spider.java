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
	private static final String N = "-n"; // Max Thread Number
	private static int connection = 100;
	private static int maxThread = 500;
	// private static final int MIN_PER_THREAD = 10;
	private static boolean verbose;
	private static String node = "node";
	private static String message = "";
	private static final String VERSION = "0.1.0";
	private static final String WELCOME = String.format("Spider Emulator\nby Luy (luics.king@gmail.com)\n%s", VERSION);

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
		Map<String, String> params = new HashMap<String, String>();
		params.put(T, "Target: node/php");
		params.put(D, "Display all info");
		params.put(V, "Version");
		params.put(H, "Help information");
		params.put(M, "Message");
		params.put(N, "Thread number");

		final StringBuilder HELP = new StringBuilder(String.format("\n%s\n\nUsage:\njava Spider http-conn-num [options]\n\n",
				WELCOME));
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
			if (arglist.contains(M)) {
				message = arglist.get(arglist.indexOf(M) + 1);
			}
			if (arglist.contains(T)) {
				node = arglist.get(arglist.indexOf(T) + 1);
			}
			if (arglist.contains(N)) {
				maxThread = Integer.parseInt(arglist.get(arglist.indexOf(N) + 1));
			}
		} catch (Exception localException) {
			System.out.println(localException);
			System.out.println(HELP);
			return;
		}

		String targetNode = "http://192.168.1.103:8000/?m=" + message;
		String targetPhp = "http://localhost:80/target.php?m=" + message;
		final String target = node.equals("node") ? targetNode : targetPhp;

		int thread = maxThread;
		// if (connection < 100) {
		// thread = 1;
		// } else if (connection < 1000) {
		// thread = 50;
		// } else if (connection < 10000) {
		// thread = 200;
		// } else {
		// thread = 500;
		// }
		// if (thread > maxThread) {
		// thread = maxThread;
		// }

		// Run

		System.out.println("Target: " + node + " " + target);
		System.out.println("Thread: " + thread);
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
							String res = httpGet(target);
							if (Spider.verbose) {
								System.out.println(String.format("[%d] %s #thread%d", j, res, index));
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