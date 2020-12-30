package com.nativemodule;

import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.preference.PreferenceManager;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class UserId extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private final String packageName;


    public UserId(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.packageName = this.reactContext.getPackageName();
    }

    @NonNull
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constan = new HashMap<>();
        constan.put("packageName", packageName);
        PackageManager pakcman = this.reactContext.getPackageManager();
        try {
            PackageInfo info = pakcman.getPackageInfo(packageName, 0);
        } catch (PackageManager.NameNotFoundException e) {
            constan.put("curenVersion", null);
        }
        return constan;
    }

    @ReactMethod
    public String getId(String name) {
        return name;
    }

    @ReactMethod
    public void getData(String name,String email, Callback callback) {
        try {
            SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(reactContext);
            name = prefs.getString("textView", "");
            email = name + "@gmail.com";
           String token = "adwasdmifhjrfg";
           String phone = "082341523234";
            callback.invoke(name,email,phone,token); // Invoke the callback here
        } catch (Exception e) {
            // exception code here
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "getUserId";
    }
}
