## Node version: 16.15.1

## Install dependencies

```bash
$ npm install --legacy-peer-deps
```

## Run local

```bash
$ npm run start
```

## Available Docker build args

While building a Docker image you can pass build-dependant arguments using `--build-arg`: 
`docker build -t baseapp:latest
  --build-arg BUILD_DOMAIN="example.com" .`

| Argument       | Description                                            |
| -------------- | ------------------------------------------------------ |
| `BUILD_EXPIRE` | Unix Timestamp of the build expiration date in seconds |
| `BUILD_DOMAIN` | Domain which you'd like to use during the deployment   |

## Build mobile app
Install dependencies using npm. Important for mobile app development.
```bash
npm install --legacy-peer-deps
```
Build frontend
```bash
npm build
```
Generate a native project (ios, android)
```bash
ionic capacitor add <platform>
```
To build a native app you should have Xcode or Android studio on your local machine.

## Build IOS app
**1. Install Xcode**

Xcode is the IDE for creating native iOS apps. It includes the iOS SDK and Xcode command-line tools. Xcode can be downloaded for free with an Apple account or it can be installed through the App Store.
Once Xcode is installed, make sure the command-line tools are selected for use:
```bash
xcode-select --install
```
**2. Set up a development team**

All iOS apps must be code signed, even for development. Luckily, Xcode makes this easy with automatic code signing. The only prerequisite is an Apple ID.

Open Xcode and navigate to **Xcode » Preferences » Accounts**. Add an Apple ID if none are listed. Once logged in, a Personal Team will appear in the team list of the Apple ID.

**3. Create an iOS Simulator**

You can test your mobile application with a connected Iphone device to the Mac or using IOS Simulator.
Open Xcode and navigate to **Window » Devices and Simulators**. Create an **iPhone 11** simulator if one does not already exist.

**4. Set configs**

Open the `capacitor.config.json` file and modify the `appId` property.

Put the name of BE server:
```json
  "server": {
    "hostname": "example.openware.work"
  }
```

**5. Open the project in Xcode.**

Launch Xcode with a prepared app:
```bash
ionic capacitor run ios
```

**6. Check Xcode configuration**
In Project navigator, select the project root to open the project editor. Under the **Identity section**, verify that the **Package ID** that was set matches the Bundle Identifier.

In the same project editor, under the **Signing section**, ensure Automatically manage signing is enabled. Then, select a Development Team. Given a Development Team, Xcode will attempt to automatically prepare provisioning and signing.

**7. Update native app with the changes**

With each meaningful change, Ionic apps must be built into web assets before the change can appear on iOS simulators and devices. The web assets then must be copied into the native project:
```bash
ionic capacitor copy ios
```

**8. Build IOS app**

To receive an executable app file run 'build' command on Xcode. You need to have an Apple Developer account to be able to extract an executable file from Xcode.

## Build Android app
**1. Install Android studio**

Android Studio is IDE, that provides the fastest tools for building apps on every type of Android device.

**2. Open the `capacitor.config.json` file and modify the `linuxAndroidStudioPath` property.**

Run next command
```bash
whereis android-studio
```

**3. Build your android application**

```bash
ionic capacitor add android
```

**4. Launch android application with Android Studio**
```bash
ionic capacitor run android
```

**5. Android Studio configuration**

Select connected android device or configure device simulator, which required

**6. Update app with the changes**
```bash
ionic capacitor copy android [options]
```

**7. Set ANDROID_SDK_ROOT variale**

Set android ask path to ANDROID_SDK_ROOT or write sdk.dir variable in android/local.properties file (it doesn't exist as a default)

**8. Build android app**

Build android app using Android Studio Build tab

or you can build apk file with command line

Debug build:

```bash
  ionic capacitor copy android && cd android && ./gradlew assembleDebug && cd ..
```

Release build:

For release build you have to create keystore path and keystore alias and run next command:

```bash
  cd android &&
  ./gradlew assembleRelease &&
  cd app/build/outputs/apk/release &&
  jarsigner -keystore YOUR_KEYSTORE_PATH -storepass YOUR_KEYSTORE_PASS app-release-unsigned.apk YOUR_KEYSTORE_ALIAS &&
  zipalign 4 app-release-unsigned.apk app-release.apk
```

# f3-frontend-reference
