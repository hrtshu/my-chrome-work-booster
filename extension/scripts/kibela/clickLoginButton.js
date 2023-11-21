(async function () {
  retry(() => {
    const loginButton = document.querySelector('a[href="/saml2/sso"]');
    if (!loginButton) return false;
    loginButton.click();
    return true;
  });
})();
