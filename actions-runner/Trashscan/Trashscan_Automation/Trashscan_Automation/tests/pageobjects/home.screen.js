class HomeScreen {

    // Back buttons (shared across screens)
    get backButton()     { return $('~Navigate up'); }
    get manualBackArrow(){ return $('id=com.gwl.trashscan:id/backArrow'); }

    // ==== Wait for Home Screen ====
    async waitForHomeScreen() {
        console.log('🏠 Waiting for Home screen...');

        await this.allowNotificationPermissionIfPresent();
        await this.allowCameraPermissionIfPresent();
        await this.allowMediaPermissionIfPresent();

        await driver.waitUntil(
            async () => {
                const ids = [
                    'com.gwl.trashscan:id/buttonClockIn',
                    'com.gwl.trashscan:id/buttonClockOut',
                    'com.gwl.trashscan:id/ll_work_progress',
                    'com.gwl.trashscan:id/ivPickUp',
                    'com.gwl.trashscan:id/ivRollback',
                    'com.gwl.trashscan:id/ivAddNotes',
                    'com.gwl.trashscan:id/ivAddSubs',
                    'com.gwl.trashscan:id/ivViolation',
                ];
                for (const id of ids) {
                    if (await $(`id=${id}`).isDisplayed().catch(() => false)) return true;
                }
                return false;
            },
            { timeout: 30000, timeoutMsg: '❌ Home screen did not load properly.' }
        );

        console.log('✅ Home screen loaded.');
    }

    // ==== Back Navigation ====
    async backToHome() {
        try {
            await this.backButton.waitForDisplayed({ timeout: 8000 });
            await this.backButton.click();
        } catch (err) {
            await driver.back();
        }
        await this.waitForHomeScreen();
    }

    // ==== Permission Helpers ====
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
    }

    async allowNotificationPermissionIfPresent() {
        try {
            const selectors = [
                'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")',
                'android=new UiSelector().text("Allow")'
            ];
            for (const selector of selectors) {
                const clicked = await this.clickIfExists(selector);
                if (clicked) { console.log('🔔 Notification permission allowed'); return; }
            }
        } catch (err) {}
    }

    async allowCameraPermissionIfPresent() {
        const selectors = [
            'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_foreground_only_button")',
            'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_one_time_button")',
            'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")',
            'android=new UiSelector().textContains("While using")',
            'android=new UiSelector().textContains("Allow")'
        ];
        for (let i = 0; i < 5; i++) {
            for (const selector of selectors) {
                const clicked = await this.clickIfExists(selector);
                if (clicked) { console.log('📸 Camera permission handled'); return true; }
            }
            await driver.pause(1000);
        }
        console.log('⚠️ No camera permission popup found');
        return false;
    }

    async allowMediaPermissionIfPresent() {
        const selectors = [
            'android=new UiSelector().text("Allow all")',
            'android=new UiSelector().text("Allow limited access")',
            'android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")'
        ];
        for (let i = 0; i < 5; i++) {
            for (const selector of selectors) {
                const clicked = await this.clickIfExists(selector);
                if (clicked) { console.log('🖼️ Media permission allowed'); return true; }
            }
            await driver.pause(1000);
        }
        return false;
    }

    // ==== Screenshot ====
    async takeScreenshot(name) {
        const fileName = `./screenshots/${name}.png`;
        await driver.saveScreenshot(fileName);
        console.log(`📸 Screenshot: ${fileName}`);
    }
}

module.exports = new HomeScreen();
