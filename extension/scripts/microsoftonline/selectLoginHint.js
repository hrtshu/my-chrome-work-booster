(async function () {
  const loginHint = new URLSearchParams(location.search).get("login_hint");
  if (!loginHint) return;

  retry(() => {
    for (const el of document.querySelectorAll("[data-test-id][data-test-hometenant]")) {
      if (el.getAttribute("data-test-id") === loginHint) {
        el.click();
        return true;
      }
    }
    return false;
  });
})();
