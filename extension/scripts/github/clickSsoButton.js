(async function () {
  const authPrompt =
    "Authenticate your account by logging into";

  retry(() => {
    if (!new URL(location.href).pathname.match("^/orgs/[a-zA-Z0-9-]+/sso$")) return true;

    // 以下をチェックすることで、純粋なログイン時のみに自動クリックとし、SSHキーへの紐付け時等は自動クリックしないようにする
    if (!document.body?.innerText.includes(authPrompt)) return false;

    const loginButton = document.querySelector("button[autofocus='autofocus']");
    if (!loginButton) return false;
    if (loginButton.innerText !== "Continue") return true;

    loginButton.click();
    return true;
  });
})();
