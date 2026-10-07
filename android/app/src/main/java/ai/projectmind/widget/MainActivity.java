package ai.projectmind.widget;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    static final String PROJECT_URL="https://projectmind-ai.ananto-sadat17.workers.dev/";
    @Override public void onCreate(Bundle state){
        super.onCreate(state); WebView web=new WebView(this); setContentView(web);
        WebSettings s=web.getSettings(); s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true);
        s.setLoadWithOverviewMode(true); s.setUseWideViewPort(true);
        web.addJavascriptInterface(new WidgetBridge(),"ProjectMindWidget");
        web.setWebViewClient(new WebViewClient(){@Override public void onPageFinished(WebView v,String u){
            v.evaluateJavascript("(function(){if(window.__pmWidgetTimer)return;window.__pmWidgetTimer=setInterval(function(){try{var t=document.body.innerText||'';var d=(t.match(/(\\d+)\\s+Delayed/i)||[])[1]||'0';var r=(t.match(/(\\d+)\\s+At Risk/i)||[])[1]||'0';var c=(t.match(/(?:Critical Path|Critical)[^\\d]{0,20}(\\d+)/i)||[])[1]||'0';var a=(t.match(/(?:Need Attention|Attention)[^\\d]{0,20}(\\d+)/i)||[])[1]||'0';var m=(t.match(/(\\d+(?:\\.\\d+)?)%/)||[])[1]||'0';ProjectMindWidget.update(d,r,c,a,m+'%')}catch(e){}} ,10000);})();",null);
        }}); web.loadUrl(PROJECT_URL);
    }
    public class WidgetBridge {
        @JavascriptInterface public void update(String d,String r,String c,String a,String p){
            getSharedPreferences("projectmind",MODE_PRIVATE).edit().putString("delayed",d).putString("risk",r).putString("critical",c).putString("attention",a).putString("progress",p).apply();
            ProjectMindWidget.refreshAll(MainActivity.this);
        }
    }
}