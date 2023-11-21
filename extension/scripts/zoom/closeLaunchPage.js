(async function () {
  retry(() => {
    const button = document.querySelector("div[role='button']");

    if (!button || button.textContent !== "ミーティングを起動") return false;

    button.click();
    chrome.runtime.sendMessage({ closeTab: true });
    return true;
  });
})();
