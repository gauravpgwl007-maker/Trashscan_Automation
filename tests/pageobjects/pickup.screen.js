const HomeScreen = require('./home.screen');

class PickupScreen {

    get pickupTile() {
        return $('id=com.gwl.trashscan:id/ivPickUp');
    }

    async openPickup() {
        await this.pickupTile.waitForDisplayed({ timeout: 5000 });
        await this.pickupTile.click();
        console.log('✅ Opened Pickup');
    }
}

module.exports = new PickupScreen();
