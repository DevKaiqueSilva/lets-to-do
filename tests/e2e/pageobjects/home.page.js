class App {
  /**
   * elements
   */
  get addButton() { return $('.add-button') }

  get taskTitleInput() { return $('#task-title-input') }
  
  get taskDescriptionInput() { return $('#task-description-input') }

  get listTextInput() { return $('#list-text-input') }

  get taskSaveButton() { return $('#task-save-button') }

  get snackMessage() { return $('#snack-message-text') }

  /**
   * methods
   */
  async open(path = '/?force=1') {
    await browser.url(path);
  }
}

module.exports = new App();
