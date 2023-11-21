chrome.runtime.onMessage.addListener(function (request, sender) {
  // コンテンツスクリプト内で `window.close()` の代わりに `chrome.runtime.sendMessage({ closeTab: true })` を呼ぶ
  if (request.closeTab) {
    chrome.tabs.remove(sender.tab.id);
  }
});
