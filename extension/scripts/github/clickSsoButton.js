(async function () {
  const authPrompt =
    "Authenticate your account by logging into";

  retry(() => {
    // 以下をチェックすることで、純粋なログイン時のみに自動クリックとし、SSHキーへの紐付け時等は自動クリックしないようにする
    if (!document.body?.innerText.includes("Single sign-on to")) return false;
    if (!document.body?.innerText.includes("Authenticate your account by logging into")) return false;

    const loginButton = document.querySelector("button[autofocus='autofocus']");
    if (!loginButton) return false;
    if (loginButton.innerText !== "Continue") return true;

    loginButton.click();
    return true;
  });
})();
