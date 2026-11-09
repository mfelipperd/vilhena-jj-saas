# 📦 Direct APK Distribution (No Store)

This project now supports direct Android APK distribution from `suaacademia.com.br`.

## What is implemented

- After successful login, Android users on `suaacademia.com.br` get a popup offering APK download.
- Popup is shown only in authenticated area and only when login just occurred.
- Download target defaults to `/downloads/vilhena-app-latest.apk`.

## Files involved

- `src/components/mobile/AndroidApkInstallPrompt.tsx`
- `src/context/AuthContext.tsx` (login marker)
- `src/App.tsx` (prompt mount point)
- `public/downloads/` (APK hosting path)

## Configure APK URL

### Default
No extra config needed if file is available at:

- `/downloads/vilhena-app-latest.apk`

### Custom URL (optional)
Set:

- `VITE_ANDROID_APK_URL`

Example:

- `VITE_ANDROID_APK_URL=https://suaacademia.com.br/downloads/vilhena-app-v1.0.0.apk`

## Operational steps

1. Build/sign APK with your Android flow.
2. Copy APK to `public/downloads/vilhena-app-latest.apk`.
3. Deploy web app.
4. Login from Android at `suaacademia.com.br` and verify popup + download.

## Notes

- Android may request permission to install from browser source.
- This approach is good for early rollout/testing without Play Store.
- For production at scale, managed updates + signed channels are still recommended.
