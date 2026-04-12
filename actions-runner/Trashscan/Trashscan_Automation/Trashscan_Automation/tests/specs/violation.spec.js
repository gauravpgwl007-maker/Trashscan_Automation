const HomeScreen      = require('../pageobjects/home.screen');
const ViolationScreen = require('../pageobjects/violation.screen');

describe('Violation Flows', () => {

    before(async () => {
        try {
            await driver.execute('mobile: shell', { command: 'pm grant', args: ['com.gwl.trashscan', 'android.permission.CAMERA'] });
            await driver.execute('mobile: shell', { command: 'pm grant', args: ['com.gwl.trashscan', 'android.permission.READ_MEDIA_IMAGES'] });
            await driver.execute('mobile: shell', { command: 'pm grant', args: ['com.gwl.trashscan', 'android.permission.READ_MEDIA_VIDEO'] });
            console.log('✅ All permissions granted via ADB');
        } catch (e) {
            console.log('⚠️ Permission grant failed');
        }
    });

    // ── Manual Violation - Full Form Flow ────────────────────────
    it('should open Manual Violation form', async () => {
        await HomeScreen.waitForHomeScreen();
        await ViolationScreen.openViolationManual();
        expect(await ViolationScreen.propertyField.isDisplayed()).toBe(true);
    });

    it('should select Property', async () => {
        await ViolationScreen.selectProperty();
        expect(await ViolationScreen.buildingField.isDisplayed()).toBe(true);
    });

    it('should select Building', async () => {
        await ViolationScreen.selectBuilding();
        expect(await ViolationScreen.unitTagField.isDisplayed()).toBe(true);
    });

    it('should select Unit Tag', async () => {
        await ViolationScreen.selectUnitTag();
        expect(await ViolationScreen.ruleField.isDisplayed()).toBe(true);
    });

    it('should select Rule', async () => {
        await ViolationScreen.selectRule();
        expect(await ViolationScreen.violationActionField.isDisplayed()).toBe(true);
    });

    it('should select Violation Action', async () => {
        await ViolationScreen.selectViolationAction();
        expect(await ViolationScreen.specialNoteField.isDisplayed()).toBe(true);
    });

    it('should enter Special Note', async () => {
        await ViolationScreen.enterSpecialNote('Test');
        expect(await ViolationScreen.addImageBtn.isDisplayed()).toBe(true);
    });

    it('should add image via camera and complete the form', async () => {
        await ViolationScreen.addImageViaCamera();
        await HomeScreen.waitForHomeScreen();
        expect(await ViolationScreen.violationTile.isDisplayed()).toBe(true);
    });

    // ── Scan View ────────────────────────────────────────────────
    it('should open Violation - Scan View and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await ViolationScreen.openViolationScanView();
        expect(await ViolationScreen.violationTile.isDisplayed()).toBe(true);
    });

    // ── Quick Snap ───────────────────────────────────────────────
    it('should open Violation - Quick Snap and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await ViolationScreen.openViolationQuickSnap();
        expect(await ViolationScreen.violationTile.isDisplayed()).toBe(true);
    });
});