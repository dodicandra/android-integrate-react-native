package com.reactnativeandroid;

import com.facebook.react.ReactActivity;

public class ReactMainActivity extends ReactActivity {
    public static MainActivity mainApps;
    public static final String appName = "ReactNative";

    protected Object getMainComponent() {
        try {
            return mainApps;
        } catch (Error err) {
            return appName;
        }
    }
}
