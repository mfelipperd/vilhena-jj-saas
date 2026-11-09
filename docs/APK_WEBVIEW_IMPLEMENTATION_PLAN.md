# 📱 APK Direct Access Plan (No Store, WebView -> suaacademia.com.br)

**Goal:** Android APK that opens `https://suaacademia.com.br` directly and preserves web session data locally on device.

---

## Current status (implemented vs pending)

## ✅ Already implemented

1. **Post-login Android popup** offering APK download.
   - File: `src/components/mobile/AndroidApkInstallPrompt.tsx`
2. Popup only appears for Android users on `suaacademia.com.br` after successful login.
3. APK distribution path documented:
   - `public/downloads/vilhena-app-latest.apk`
4. Capacitor base setup is present:
   - `capacitor.config.ts`
   - `@capacitor/*` dependencies and scripts in `package.json`
5. Capacitor configured to load production URL directly:
   - `server.url = "https://suaacademia.com.br"`
6. Android native wrapper project generated:
   - `android/` created via Capacitor
7. Debug APK built successfully:
   - `android/app/build/outputs/apk/debug/app-debug.apk`
8. Debug APK copied to public download path:
   - `public/downloads/vilhena-app-latest.apk`

## 🟡 Still pending (to have a real APK artifact)

1. Build **release-signed** APK/AAB (current one is debug build).
2. Deploy web so `/downloads/vilhena-app-latest.apk` is publicly reachable in production.
3. Validate login/session persistence and install/update flow on real Android devices.
4. Define manual update cadence/versioning strategy for direct APK distribution.

---

## Session persistence model (how it works)

With `server.url` pointing to `https://suaacademia.com.br`, Android WebView stores:

- First-party cookies (including refresh token cookie from your backend)
- LocalStorage / IndexedDB for the web app

This gives persistent connectivity/session behavior similar to browser app mode.

> Note: `sessionStorage` is not intended for long-term persistence across process restarts.
> For persistence, rely on refresh cookie + localStorage/IndexedDB.

---

## Execution plan (recommended)

## Phase 1 — Generate Android wrapper (1 day)

1. Run:
   - `pnpm mobile:cap:add:android`
2. Sync:
   - `pnpm mobile:cap:sync:android`
3. Open Android Studio:
   - `pnpm mobile:apk:open`

## Phase 2 — Build APK (1 day)

1. Configure Android app signing (debug first, then release keystore).
2. Build APK from Android Studio (`assembleDebug` / `assembleRelease`).
3. Rename/copy artifact to:
   - `public/downloads/vilhena-app-latest.apk`

## Phase 3 — Deploy + validate (1–2 days)

1. Deploy web with APK file hosted.
2. Login from Android on `suaacademia.com.br`.
3. Confirm popup -> download -> install works.
4. Confirm session remains valid after app relaunch.

---

## Validation checklist

- [ ] APK installs successfully on Android 10+
- [ ] App opens `https://suaacademia.com.br` fullscreen in WebView
- [ ] Login works from APK app
- [ ] Session survives app close/reopen
- [ ] QR and camera flow tested in APK app
- [ ] Download popup appears once per login event as expected

---

## Risks and mitigations

1. **WebView cookie behavior on specific devices**
   - Mitigation: test on at least 3 vendors (Samsung, Xiaomi, Motorola/Pixel).
2. **Manual update process for APK users**
   - Mitigation: keep `vilhena-app-latest.apk` stable URL and show "new version" notice in-app.
3. **Unknown sources install friction**
   - Mitigation: add a short install help guide in web UI.

---

## Minimal next command sequence

1. `pnpm mobile:cap:sync:android`
2. `pnpm mobile:apk:open`
3. Build release APK in Android Studio (signed)
4. Deploy and verify `/downloads/vilhena-app-latest.apk`

The debug APK is already generated, but release signing is still required for stable distribution.
