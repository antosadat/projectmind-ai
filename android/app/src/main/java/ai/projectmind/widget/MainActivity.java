package ai.projectmind.widget;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    static final String PROJECT_URL = "https://projectmind-ai.ananto-sadat17.workers.dev/";

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        WebView web = new WebView(this);
        setContentView(web);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        web.addJavascriptInterface(new WidgetBridge(), "ProjectMindWidget");
        web.setWebViewClient(new WebViewClient() {
            @Override public void onPageFinished(WebView view, String url) {
                view.evaluateJavascript(
                    "(function(){window.ProjectMindWidget&&ProjectMindWidget.startPolling();})();", null);
            }
        });
        web.loadUrl(PROJECT_URL);
    }

    public class WidgetBridge {
        @JavascriptInterface public void startPolling() {
            final WebView w = (WebView) findViewById(android.R.id.content).findViewWithTag("projectmind-webview");
            runOnUiThread(new Runnable() {
                @Override public void run() {
                    // Kept for compatibility; the polling script is injected below.
                }
            });
        }

        @JavascriptInterface public void update(String delayed, String risk, String progress) {
            getSharedPreferences("projectmind", MODE_PRIVATE).edit()
                .putString("delayed", delayed).putString("risk", risk)
                .putString("progress", progress).apply();
            ProjectMindWidget.refreshAll(MainActivity.this);
        }
    }
}
