(async function () {
  retry(
    () => {
      const links = Array.from(document.querySelectorAll(".Link--primary"));
      links
        .filter((link) => link.getAttribute("target") !== "_blank")
        .forEach((link) => {
          link.setAttribute("target", "_blank");
        });
    },
    { maxRetry: null }
  );
})();
