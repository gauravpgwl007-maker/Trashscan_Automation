const HomeScreen        = require('../pageobjects/home.screen');
const WorkProgressScreen = require('../pageobjects/workprogress.screen');

describe('Work Progress Tile', () => {

    it('should open Work Progress and return to Home', async () => {
        await HomeScreen.waitForHomeScreen();
        await WorkProgressScreen.openWorkProgress();
        await HomeScreen.backToHome();
        expect(await WorkProgressScreen.workProgressTile.isDisplayed()).toBe(true);
    });
});
