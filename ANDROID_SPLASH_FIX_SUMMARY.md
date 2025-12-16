# Android Splash Resource Fix Summary

## Problem
Android构建失败，错误信息：
```
error: resource drawable/splash (aka ai.ruos.app:drawable/splash) not found.
```

## Root Cause
1. `styles.xml`中的`AppTheme.NoActionBarLaunch`样式引用了`@drawable/splash`
2. 但只有`splash.png`文件存在，缺少对应的XML drawable资源
3. 同时缺少颜色定义：`colorPrimary`、`colorPrimaryDark`、`colorAccent`

## Solutions Applied

### 1. Created splash.xml drawable resource
**File**: `android/app/src/main/res/drawable/splash.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/colorPrimary" />
    <item>
        <bitmap
            android:gravity="center"
            android:src="@drawable/splash.png" />
    </item>
</layer-list>
```

### 2. Created colors.xml resource
**File**: `android/app/src/main/res/values/colors.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#3F51B5</color>
    <color name="colorPrimaryDark">#303F9F</color>
    <color name="colorAccent">#FF4081</color>
</resources>
```

### 3. Increased Gradle download timeout
**File**: `android/gradle/wrapper/gradle-wrapper.properties`
- Changed `networkTimeout` from `10000` to `60000` (60 seconds)

## Previous Fixes (AndroidX Issues)
- Fixed `gradle.properties` AndroidX configuration
- Removed conflicting `project.ext` settings from build files
- Updated GitHub Actions workflow

## Verification
To verify the fix works:
1. Run `cd android && ./gradlew assembleDebug` (or `.\gradlew.bat assembleDebug` on Windows)
2. Check for successful build completion
3. Verify APK is generated in `android/app/build/outputs/apk/debug/`

## Files Modified
- `android/app/src/main/res/drawable/splash.xml` (created)
- `android/app/src/main/res/values/colors.xml` (created)
- `android/gradle/wrapper/gradle-wrapper.properties` (modified)
- `gradle.properties` (previous AndroidX fix)
- `android/gradle.properties` (previous AndroidX fix)
- `.github/workflows/android.yml` (previous AndroidX fix)
