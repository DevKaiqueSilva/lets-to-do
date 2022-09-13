const Login = require('../pageobjects/login.page');

describe('Lets do it!', () => {
  it('Testing login form...', async () => {
    await Login.open();
    await Login.userInput.setValue("kaiquesouzasilva11@gmail.com");
    await Login.passwordInput.setValue("123");
    await Login.loginButton.click();
    await Login.successLogin.waitForExist({timeout: 3000});
    let isExisting = await Login.successLogin.isExisting();
    await expect(isExisting).toEqual(true);
  });
});
