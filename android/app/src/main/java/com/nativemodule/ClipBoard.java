package com.nativemodule;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;

import com.facebook.react.bridge.ContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = ClipBoard.NAME)
public class ClipBoard extends ContextBaseJavaModule {
    public ClipBoard(Context context) {
        super(context);
    }

    public static final String NAME = "RNCClipboard";

    @Override
    public String getName() {
        return ClipBoard.NAME;
    }

    private ClipboardManager getClipboardService() {
        return (ClipboardManager) getContext().getSystemService(getContext().CLIPBOARD_SERVICE);
    }

    @ReactMethod
    public void getString(Promise promise) {
        try {
            ClipboardManager clipboard = getClipboardService();
            ClipData clipData = clipboard.getPrimaryClip();
            if (clipData != null && clipData.getItemCount() >= 1) {
                ClipData.Item firstItem = clipboard.getPrimaryClip().getItemAt(0);
                promise.resolve("" + firstItem.getText());
            } else {
                promise.resolve("");
            }
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void setString(String text) {
        ClipData clipdata = ClipData.newPlainText(null, text);
        ClipboardManager clipboard = getClipboardService();
        clipboard.setPrimaryClip(clipdata);
    }

    @ReactMethod
    public void hasString(Promise promise) {
        try {
            ClipboardManager clipboard = getClipboardService();
            ClipData clipData = clipboard.getPrimaryClip();
            promise.resolve(clipData != null && clipData.getItemCount() >= 1);
        } catch (Exception e) {
            promise.reject(e);
        }
    }
}
