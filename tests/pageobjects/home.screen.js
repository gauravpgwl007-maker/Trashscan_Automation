class HomeScreen {

    // ==== Selectors (GETTERS) ====
    get clockInBtn() {
        return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/buttonClockIn")');
    }

    get clockOutBtn() {
        return $('android=new UiSelector().resourceId("com.gwl.trashscan:id/buttonClockOut")');
    }

    get workProgressTile() { return $('id=com.gwl.trashscan:id/ll_work_progress'); }
    get pickupTile() { return $('id=com.gwl.trashscan:id/ivPickUp'); }
    get activityLogsTile() { return $('id=com.gwl.trashscan:id/ivRollback'); }
    get addNotesTile() { return $('id=com.gwl.trashscan:id/ivAddNotes'); }
    get dailyWorkPlanTile() { return $('id=com.gwl.trashscan:id/ivAddSubs'); }
    get violationTile() { return $('id=com.gwl.trashscan:id/ivViolation'); }

    // Violation popup options
    get manualOption() { return $('id=com.gwl.trashscan:id/buttonManully'); }
    get scanViewOption() { return $('id=com.gwl.trashscan:id/buttonScan'); }
    get quickSnapOption() { return $('id=com.gwl.trashscan:id/buttonQuickSnap'); }

    // Back buttons
    get backButton() { return $('~Navigate up'); }
    get manualBackArrow() { return $('id=com.gwl.trashscan:id/backArrow'); }

    /**
     * Wait for Home screen
     */
    async waitForHomeScreen() {
        console.log('🏠 Waiting for Home screen...');

        // Handle permission popups
        await this.allowNotificationPermissionIfPresent();
        await this.allowCameraPermissionIfPresent();
        await this.allowMediaPermissionIfPresent();

        await driver.waitUntil(
            async () => {
                return (await this.clockInBtn.isDisplayed().catch(() => false)) ||
                    (await this.clockOutBtn.isDisplayed().catch(() => false)) ||
                    (await this.workProgressTile.isDisplayed().catch(() => false)) ||
                    (await this.pickupTile.isDisplayed().catch(() => false)) ||
                    (await this.activityLogsTile.isDisplayed().catch(() => false)) ||
                    (await this.addNotesTile.isDisplayed().catch(() => false)) ||
                    (await this.dailyWorkPlanTile.isDisplayed().catch(() => false)) ||
                    (await this.violationTile.isDisplayed().catch(() => false));
            },
            { timeout: 30000, timeoutMsg: '❌ Home screen did not load properly.' }
        );

        console.log('✅ Home screen loaded.');
    }

    async clickIfExists(selector) {
        const elements = await $$(selector);
        if (elements.length > 0) {
            try {
                if (await elements[0].isDisplayed()) {
                    await elements[0].click();
                    return true;
                }
            } catch (e) {}
        }
        return false;
    }/**
     * Notification permission
     */
    async allowNotificationPermissionIfPresent() {
        try {
            const selectors = [
                'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")',
                'android=new UiSelector().text("Allow")'
            ];

            for (let selector of selectors) {
    const clicked = await this.clickIfExists(selector);
    if (clicked) {
        console.log('🔔 Notification permission allowed');
        return;
    }

            }
        } catch (err) {}
    }

    /**
     * Camera permission (robust with retry)
     */
    async allowCameraPermissionIfPresent() {
    const selectors = [
        'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_foreground_only_button")',
        'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_one_time_button")',
        'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")',
        'android=new UiSelector().textContains("While using")',
        'android=new UiSelector().textContains("Allow")'
    ];

    for (let i = 0; i < 5; i++) {
        for (let selector of selectors) {
            const clicked = await this.clickIfExists(selector);
            if (clicked) {
                console.log('📸 Camera permission handled');
                return true;
            }
        }
        await driver.pause(1000);
    }

    console.log('⚠️ No camera permission popup found');
    return false;
}

    /**
     * Media permission (Android 13+)
     */
    async allowMediaPermissionIfPresent() {
        const selectors = [
            'android=new UiSelector().text("Allow all")',
            'android=new UiSelector().text("Allow limited access")',
            'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")'
        ];

        for (let i = 0; i < 5; i++) {
            for (let selector of selectors) {
                try {
                    for (let selector of selectors) {
    const clicked = await this.clickIfExists(selector);
    if (clicked) {
        console.log('🖼️ Media permission allowed');
        return true;
    }
}
                } catch (e) {}
            }
            await driver.pause(1000);
        }

        return false;
    }

    // ==== Actions ====
    async takeScreenshot(name) {
    const fileName = `./screenshots/${name}.png`;
    await driver.saveScreenshot(fileName);
    console.log(`📸 Screenshot: ${fileName}`);
}
    async clockIn() {
        await this.clockInBtn.waitForDisplayed({ timeout: 5000 });
        await driver.pause(1000);
        await this.clockInBtn.click();
        console.log('✅ Clock In done');
    }

    async clockOut() {
        await this.clockOutBtn.waitForDisplayed({ timeout: 5000 });
        await this.clockOutBtn.click();
        console.log('📉 Clock Out done');
    }

    async openWorkProgress() {
        await this.workProgressTile.waitForDisplayed({ timeout: 5000 });
        await this.workProgressTile.click();
    }

    async openPickup() {
        await this.pickupTile.waitForDisplayed({ timeout: 5000 });
        await this.pickupTile.click();
    }

    async openActivityLogs() {
        await this.activityLogsTile.waitForDisplayed({ timeout: 5000 });
        await this.activityLogsTile.click();
    }

    async openAddNotes() {
        await this.addNotesTile.waitForDisplayed({ timeout: 5000 });
        await this.addNotesTile.click();
    }

    async openDailyWorkPlan() {
        await this.dailyWorkPlanTile.waitForDisplayed({ timeout: 5000 });
        await this.dailyWorkPlanTile.click();
    }

    // ===== Violation Flow =====

    async openViolation() {
        await this.violationTile.waitForDisplayed({ timeout: 5000 });
        await this.violationTile.click();
    }

    async openViolationManual() {
        await this.openViolation();
        await this.manualOption.waitForDisplayed({ timeout: 5000 });
        await this.manualOption.click();
        await this.manualBackArrow.waitForDisplayed({ timeout: 5000 });
        await this.manualBackArrow.click();
        await this.waitForHomeScreen();
    }

    async openViolationScanView() {
        await this.openViolation();
        await this.scanViewOption.waitForDisplayed({ timeout: 5000 });
        await this.scanViewOption.click();

        await driver.pause(2000);

        await this.allowCameraPermissionIfPresent();
        await this.allowMediaPermissionIfPresent();

        await this.backButton.waitForDisplayed({ timeout: 10000 });
        await this.backButton.click();

        await this.waitForHomeScreen();
    }

    async openViolationQuickSnap() {
        await this.openViolation();
        await this.quickSnapOption.waitForDisplayed({ timeout: 5000 });
        await this.quickSnapOption.click();

        await driver.pause(2000);

        await this.allowCameraPermissionIfPresent();
        await this.allowMediaPermissionIfPresent();

        await this.backButton.waitForDisplayed({ timeout: 10000 });
        await this.backButton.click();

        await this.waitForHomeScreen();
    }

    // ===== Back Navigation =====

    async backToHome() {
        try {
            await this.backButton.waitForDisplayed({ timeout: 8000 });
            await this.backButton.click();
        } catch (err) {
            await driver.back();
        }

        await this.waitForHomeScreen();
    }
}

module.exports = new HomeScreen();