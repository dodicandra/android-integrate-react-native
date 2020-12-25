# REACT NATIVE TO ANDROID STUDIO

## Install

### STEP 1

- Jadikan folder android sub folder dengan nama `android`

* Download [NodeJS LTS](https://nodejs.org/en/download/)
  - install yarn untuk projek : [yarn](https://yarnpkg.com/getting-started/install) atau tambahkan pada node secara global `npm install -g yarn`
* Install Javascript depedencies di `package.json` <br>

```json
{
  "name": "NamaAplikasi",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "yarn react-native start"
  }
}
```

- Tambahkan React native pada package `yarn add react-native`
- Tambahkan pada `android/build.gradle` <br>

```kotlin
...
  allprojects {
    repositories {
        google()
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url("$rootDir/../node_modules/react-native/android")
        }
        maven {
            url("$rootDir/../node_modules/jsc-android/dist")
        }

        maven { url 'https://maven.google.com' }

        maven { url "https://www.jitpack.io" }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
...
```

- Aktifkan React native autolinking di `android/settings.gradle`

```kotlin
include ':app'
rootProject.name = "ReactNativeAndroid"
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle");
applyNativeModulesSettingsGradle(settings)
```

- konfigurasi permission `AndroidManifest.xml`

```XML
  <uses-permission android:name="android.permission.INTERNET" />
```

- untuk mengakses dev setting RN

```XML
<activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
```

- Aktifkan `usesCleartextTraffic` di `AndroidManifest.xml`

```XML
<!-- ... -->
<application
android:usesCleartextTraffic="true" tools:targetApi="28" >
<!-- ... -->
</application>
<!-- ... -->
```

- Aktifkan `Hermes` pada `android/app/build.gradle` **_di top Level_**<br>

```kotlin
  project.ext.react = [
      enableHermes: false,
      entryFile: "index.js"
]

apply from: "../../node_modules/react-native/react.gradle"

def jscFlavor = 'org.webkit:android-jsc:+';
def enableHermes = project.ext.react.get("enableHermes", false);
def enableSeparateBuildPerCPUArchitecture = false
```

- Tambahkan depedencies pada `android/app/build.gradle`

```kotlin
android {
...
implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "com.facebook.react:react-native:+" // From node_modules
    //Hermes Dependencies Setup here...
    if (enableHermes) {
        def hermesPath = "../../node_modules/hermes-engine/android/";
        debugImplementation files(hermesPath + "hermes-debug.aar")
        releaseImplementation files(hermesPath + "hermes-release.aar")
    } else {
        implementation jscFlavor
    }
...
}
```

- Tambahkan ini pada `android/app/build.gradle` _paling bawah_

```kotlin
apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle");

applyNativeModulesAppBuildGradle(project)
```

### STEP 2

- Tambahkan RootActivity React native di `android/app/src/main/java` file name `ReactMainActivity.java`

```java
package com.reactnativeandroid;

import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;

public class ReactMainActivity extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                protected List<ReactPackage> getPackages() {
                    @SuppressWarnings("UnnecessaryLocalVariable")
                    List<ReactPackage> packages = new PackageList(this).getPackages();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    packages.add(new RNpakages());
                    return packages;
                }

                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }

                @Override
                protected String getJSBundleFile() {
                    return "assets://index.android.bundle";
                }
            };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, false);
    }
}

```

- Tambahkan file `RnInit.java` pada folde yang sama <br>

```java
package com.reactnativeandroid;

import android.content.Intent;

import com.facebook.react.ReactActivity;

public class RnInit extends ReactActivity {
    @Override
    protected String getMainComponentName() {
        return "ReactNative";
    }
}
```

- Jadikan File `ReactMainActivity.java` sebagai activity di `AndroidManifest.xml`

```XML
<application
        ...
        android:name=".ReactMainActivity"
        android:usesCleartextTraffic="true"
        ...
        >
        <activity
            android:name="com.reactnativeandroid.MainActivity"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode"
            android:label="@string/app_name"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" /> // untuk debuging RN
        <!-- |start| Untuk memulai RN Apps -->
        <activity
            android:name=".RnInit"
            android:label="@string/app_name"
            android:launchMode="singleTask"
            android:theme="@style/Theme.AppCompat.Light.NoActionBar" />
            <!-- |end| -->
    </application>
```

### STEP 3 code integration

- salin code pada `src` , `App.tsx`, `index.js`
- salin file config yang di perlukan `rn-cli.config.js` , `tsconfig.json` , `index.d.ts`, `babel.config.js`

### STEP 4 Native Module

- ambil data dari `HomeFragment`

```java
Button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(getActivity());
                SharedPreferences.Editor editor = prefs.edit();
                editor.putString("textView", rnInput.getText().toString().trim());
                editor.apply();
                Intent intent = new Intent(getActivity(), RnInit.class);
                startActivity(intent);
            }
        });
```

- untuk mengirim data dari android native ke RN siapkan package nativemodule di `android/app/src/main/java/com/nativemodule` file: `UserId.java`

```java
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
            callback.invoke(name,email); // Invoke the callback here
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

```

- set root folder `RNpakages.java`

```java
package com.reactnativeandroid;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.nativemodule.ClipBoard;
import com.nativemodule.UserId;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class RNpakages implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new ClipBoard(reactContext));
        modules.add(new UserId(reactContext));
        return modules;
    }


    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
```
