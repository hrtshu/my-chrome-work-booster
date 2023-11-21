(async function () {
  retry(() => {
    const links = Array.from(document.getElementsByTagName("a"));
    const link = links.find(
      (e) =>
        e.innerText == "このリンクをブラウザで開く" ||
        e.innerText == "open this link in your browser"
    );

    if (!link) return false;

    link.click();
    return true;
  });
})();
