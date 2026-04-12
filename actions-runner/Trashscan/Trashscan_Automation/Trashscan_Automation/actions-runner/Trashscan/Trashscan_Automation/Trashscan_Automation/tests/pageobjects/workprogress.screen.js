const HomeScreen = require('./home.screen');

class WorkProgressScreen {

    get workProgressTile() {
        return $('id=com.gwl.trashscan:id/ll_work_progress');
    }

    async openWorkProgress() {
        await this.workProgressTile.waitForDisplayed({ timeout: 5000 });
        await this.workProgressTile.click();
        console.log('✅ Opened Work Progress');
    }
}

module.exports = new WorkProgressScreen();
