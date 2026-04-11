const HomeScreen = require('../pageobjects/home.screen');

describe('Home Screen Functionality', () => {

    before(async () => {
        try {
            await driver.execute('mobile: shell', {
                command: 'pm grant',
                args: ['com.gwl.trashscan', 'android.permission.CAMERA']
            });
            await driver.execute('mobile: shell', {
                command: 'pm grant',
                args: ['com.gwl.trashscan', 'android.permission.READ_MEDIA_IMAGES']
            });
            await driver.execute('mobile: shell', {
                command: 'pm grant',
                args: ['com.gwl.trashscan', 'android.permission.READ_MEDIA_VIDEO']
            });
            console.log('✅ All permissions granted via ADB');
        } catch (e) {
            console.log('⚠️ Permission grant failed');
        }
    });

    // ── 1. Clock In ──────────────────────────────────────────────
    it('should handle Clock In if available', async () => {
        await HomeScreen.waitForHomeScreen();

        if (await HomeScreen.clockInBtn.isDisplayed().catch(() => false)) {
            console.log('🕓 Clock In button found, performing action...');
            await HomeScreen.clockIn();
            expect(await HomeScreen.clockOutBtn.isDisplayed()).toBe(true);
        } else {
            console.log('⚠️ Clock In button not found, skipping.');
        }
    });

    // ── 2. Home Screen Tile Functions ────────────────────────────
    it('should open Work Progress and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openWorkProgress();
        await HomeScreen.backToHome();
        expect(await HomeScreen.workProgressTile.isDisplayed()).toBe(true);
    });

    it('should open Pickup and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openPickup();
        await HomeScreen.backToHome();
        expect(await HomeScreen.pickupTile.isDisplayed()).toBe(true);
    });

    it('should open Activity Logs and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openActivityLogs();
        await HomeScreen.backToHome();
        expect(await HomeScreen.activityLogsTile.isDisplayed()).toBe(true);
    });

    it('should open Add Notes and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openAddNotes();
        await HomeScreen.backToHome();
        expect(await HomeScreen.addNotesTile.isDisplayed()).toBe(true);
    });

    it('should open Daily Work Plan and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await HomeScreen.openDailyWorkPlan();
        await HomeScreen.backToHome();
        expect(await HomeScreen.dailyWorkPlanTile.isDisplayed()).toBe(true);
    });

    it('should complete all Violation flows', async () => {
        await HomeScreen.waitForHomeScreen();
        console.log('🚀 Starting Violation flows...');
        await HomeScreen.openViolationManual();
        await HomeScreen.openViolationScanView();
        await HomeScreen.openViolationQuickSnap();
        console.log('✅ All violation tasks completed');
        expect(await HomeScreen.violationTile.isDisplayed()).toBe(true);
    });

    // ── 3. Clock Out ─────────────────────────────────────────────
    it('should perform Clock Out at the end', async () => {
        await HomeScreen.waitForHomeScreen();

        if (await HomeScreen.clockOutBtn.isDisplayed().catch(() => false)) {
            console.log('🕕 Performing Clock Out...');
            await HomeScreen.clockOut();
            expect(await HomeScreen.clockInBtn.isDisplayed()).toBe(true);
        } else {
            console.log('⚠️ Clock Out button not found at end');
        }
    });

    // ── Drawer menu tests run in menu.spec.js after this suite ───
});