class App {
  /**
   * elements
   */
  get userInput() { return $('#user-input') }

  get passwordInput() { return $('#password-input') }

  get loginButton() { return $('#login-button') }

  get successLogin() { return $('#success-login') }

  /**
   * methods
   */
  async open(path = '/login') {
    browser.execute('window.localStorage.clear()');
    await browser.url(path);
  }
}

module.exports = new App();
