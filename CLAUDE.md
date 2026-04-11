# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mobile UI automation test suite for the **TrashScan Android app** (`com.gwl.trashscan`) — a waste management/garbage collection app for employee workflows. Tests cover login, clock in/out, violation reporting, home screen navigation, menu, and logout flows.

## Commands

### Run All Tests
```bash
npm test
# Equivalent to: npx wdio run wdio.conf.js
```

### Run a Single Spec File
```bash
npx wdio run wdio.conf.js --spec tests/specs/login.spec.js
```

### Install Dependencies
```bash
npm install --legacy-peer-deps
```

### Generate & Open Allure Report
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

### Local Full Run (Windows)
```
Run_automation.bat
```
This starts Appium on port 4723, waits for it, runs tests, then generates and opens the Allure report.

## Environment Requirements

- **Android SDK** at `C:\Users\gwl\AppData\Local\Android\Sdk` with `ANDROID_HOME` set
- **AVD** named `Pixel_7` (Android 14, Pixel 7 profile) must exist
- **Appium** runs on `127.0.0.1:4723` with `--allow-insecure=adb_shell`
- **App under test**: APK located in `apps/` directory (staging and production variants)
- **Target device**: `emulator-5554`

## Architecture

### Pattern: Page Object Model (POM)

```
tests/
├── specs/          # Mocha BDD test scenarios (one per feature)
├── pageobjects/    # Screen classes encapsulating selectors + actions
├── fixtures/
│   └── users.json  # Test credentials (valid + invalid)
└── services/       # Currently unused
```

Each page object in `tests/pageobjects/` exports a **singleton instance** (`module.exports = new SomeScreen()`). Screen classes contain:
- Getter methods returning element selectors (using `$()` or `$$()`)
- Async helper methods for multi-step interactions

### Test Execution Order

Defined explicitly in `wdio.conf.js` `specs` array:
1. `launch.spec.js`
2. `login.spec.js`
3. `home.spec.js`
4. `menu.spec.js`
5. `logout.spec.js`

Tests run sequentially (`maxInstances: 1`) with `noReset: true` — app state persists between specs within a run.

### Key wdio.conf.js Hooks

- `before()` — Grants ADB permissions (camera, location, media, notifications) via `driver.execute('mobile: shell', ...)`
- `afterTest()` — Captures screenshot on every test completion, saved to `./screenshots/` with timestamp
- `afterSuite()` — Logs suite completion

### Selector Strategy

Elements are located using:
- Android resource IDs: `id=com.gwl.trashscan:id/<element_id>`
- UiSelector: `android=new UiSelector().resourceId('...')` or `.text('...')`
- Accessibility labels: `~<content-desc>`

### CI/CD (Jenkins)

Defined in `Jenkinsfile`. Scheduled daily at **9:30 PM** (`cron('30 21 * * *')`).

Pipeline stages:
1. Checkout → Install deps (`--legacy-peer-deps`) → Start emulator → Wait for boot
2. Start Appium (background process) → Grant permissions → Run tests
3. Generate Allure report → Publish to Jenkins → Kill emulator (cleanup)

Allure results go to `allure-results/`, rendered report to `allure-report/`.

## Test Data

Credentials are in `tests/fixtures/users.json`:
- Valid user: `porter@yopmail.com` / `123456`
- Invalid user: `wrong` / `1234`
