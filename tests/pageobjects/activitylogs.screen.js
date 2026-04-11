const HomeScreen = require('./home.screen');

class ActivityLogsScreen {

    get activityLogsTile() {
        return $('id=com.gwl.trashscan:id/ivRollback');
    }

    async openActivityLogs() {
        await this.activityLogsTile.waitForDisplayed({ timeout: 5000 });
        await this.activityLogsTile.click();
        console.log('✅ Opened Activity Logs');
    }
}

module.exports = new ActivityLogsScreen();
