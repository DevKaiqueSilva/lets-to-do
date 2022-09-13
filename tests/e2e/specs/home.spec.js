const Home = require('../pageobjects/home.page');

describe('Lets do it!', () => {
  it('Testing New Task form...', async () => {
    await Home.open();
    await Home.addButton.waitForExist({timeout: 5000});
    await Home.addButton.click();
    await Home.listTextInput.waitForExist({timeout: 5000});
    await browser.pause(1000);
    await Home.listTextInput.setValue("New List");
    await Home.taskTitleInput.setValue("New Task Test");
    await Home.taskDescriptionInput.setValue("New Description Text");
    await Home.taskSaveButton.click();
    await Home.snackMessage.waitForExist({timeout: 1000});
    await browser.pause(500);
    let snackText = await Home.snackMessage.getText();
    await expect(snackText).toEqual("Tarefa salva com sucesso.");
  });
});
