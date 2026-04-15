# FitLife AI - Android Source Code

This is the production-ready native Android source code for FitLife AI, built with Kotlin and XML.

## Features
- **Firebase Auth:** Google Sign-In and Email/Password authentication.
- **Firestore:** Real-time data sync for user stats and workout history.
- **AdMob Integration:** Pre-configured Banner and Interstitial ads.
- **Material 3 Design:** Modern dark-themed UI matching the web application.
- **Navigation Component:** Robust fragment-based navigation.

## Setup Instructions

### 1. Firebase Configuration
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project named "FitLife AI".
3. Add an Android App with package name `com.fitlife.ai`.
4. Download the `google-services.json` file.
5. Place it in the `android/app/` directory.

### 2. AdMob Configuration
1. Go to the [AdMob Console](https://apps.admob.com/).
2. Create a new Android App.
3. Replace the placeholder App ID in `AndroidManifest.xml`.
4. Create Banner and Interstitial ad units and update the IDs in `AdManager.kt`.

### 3. Build & Run
1. Open the `android` folder in **Android Studio**.
2. Wait for Gradle sync to complete.
3. Connect an Android device or emulator.
4. Click **Run**.

## Architecture
- **MVVM:** Model-View-ViewModel architecture for clean separation of concerns.
- **ViewBinding:** Type-safe access to layout views.
- **Coroutines:** Asynchronous programming for network and database operations.
