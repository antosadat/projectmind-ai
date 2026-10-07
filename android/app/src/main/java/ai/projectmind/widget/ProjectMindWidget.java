package ai.projectmind.widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ProjectMindWidget extends AppWidgetProvider {
    static final String PREF = "projectmind";

    @Override public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
        for (int id : ids) update(context, manager, id);
    }

    static void update(Context c, AppWidgetManager m, int id) {
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.projectmind_widget);
        android.content.SharedPreferences p = c.getSharedPreferences(PREF, Context.MODE_PRIVATE);
        v.setTextViewText(R.id.widget_delayed, "🔴 " + p.getString("delayed","0") + " Delayed");
        v.setTextViewText(R.id.widget_risk, "🟠 " + p.getString("risk","0") + " At Risk");
        v.setTextViewText(R.id.widget_progress, "Progress: " + p.getString("progress","0%"));
        Intent i = new Intent(c, MainActivity.class);
        PendingIntent pi = PendingIntent.getActivity(c, 0, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        v.setOnClickPendingIntent(R.id.widget_root, pi);
        m.updateAppWidget(id, v);
    }

    public static void refreshAll(Context c) {
        AppWidgetManager m = AppWidgetManager.getInstance(c);
        ComponentName name = new ComponentName(c, ProjectMindWidget.class);
        int[] ids = m.getAppWidgetIds(name);
        for (int id : ids) update(c, m, id);
    }
}
