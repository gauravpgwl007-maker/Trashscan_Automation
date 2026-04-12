const HomeScreen = require('./home.screen');

class AddNotesScreen {

    get addNotesTile() {
        return $('id=com.gwl.trashscan:id/ivAddNotes');
    }

    async openAddNotes() {
        await this.addNotesTile.waitForDisplayed({ timeout: 5000 });
        await this.addNotesTile.click();
        console.log('✅ Opened Add Notes');
    }
}

module.exports = new AddNotesScreen();
