(async function () {
  function getCurrentProjectId(url) {
    return new URL(url).pathname.split("/")[2];
  }

  let previousUrl = location.href;
  let previousProjectId = getCurrentProjectId(previousUrl);

  retry(
    () => {
      const currentUrl = location.href;
      const currentProjectId = getCurrentProjectId(currentUrl);

      if (
        currentProjectId !== previousProjectId || // プロジェクトが変わった際
        currentUrl === previousUrl + "/f" // 全画面で開く際
      ) {
        // 元々開いていたPJを見失わないように別タブで開く
        window.open(currentUrl);
        history.back();
      } else {
        previousUrl = currentUrl;
        previousProjectId = currentProjectId;
      }
    },
    200,
    null
  );
})();
