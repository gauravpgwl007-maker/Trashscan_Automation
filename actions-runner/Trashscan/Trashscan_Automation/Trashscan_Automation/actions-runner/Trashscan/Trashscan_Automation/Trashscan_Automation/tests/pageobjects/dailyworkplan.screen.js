const HomeScreen = require('./home.screen');

class DailyWorkPlanScreen {

    get dailyWorkPlanTile() {
        return $('id=com.gwl.trashscan:id/ivAddSubs');
    }

    async openDailyWorkPlan() {
        await this.dailyWorkPlanTile.waitForDisplayed({ timeout: 5000 });
        await this.dailyWorkPlanTile.click();
        console.log('✅ Opened Daily Work Plan');
    }
}

module.exports = new DailyWorkPlanScreen();
