(async function () {
  retry(
    () => {
      const link = document.querySelector("a[title='Open the note page']");
      if (!link) return false;

      link.target = "_blank";
    },
    { maxRetry: null }
  );
})();
