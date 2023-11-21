(async function () {
  function openSidebar(open = true) {
    const sidebar = document.querySelector("#asana_sidebar");
    const sidebarButton = document.querySelector(
      ".GlobalTopbarStructure-leftChildren > div[role='button'][aria-label^='サイドバーを']"
    );
    if (
      sidebar === undefined ||
      sidebar === null ||
      sidebarButton === undefined ||
      sidebarButton === null
    )
      return false;

    if (open ^ (sidebar.style.width !== "0px")) sidebarButton.click();

    return true;
  }

  function openTopbar(selector, open = true) {
    const topbar = document.querySelector(selector);

    if (topbar === null || topbar === undefined) return false;

    topbar.style.display = open ? null : "none";
    return true;
  }

  function addHeaderSwitchButton() {
    const button = document.createElement("button");
    button.id = "headerSwitchButton";
    button.textContent = "";

    const style = document.createElement("style");
    style.textContent = `
	    #headerSwitchButton {
	      width: 13px;
	      height: 13px;
	      position: fixed;
	      top: 5px;
	      right: 5px;
	      background-color: lightgray;
	      border: 1px solid darkgray;
	      padding: 1px;
	      border-radius: 50%;
	      z-index: 1000;
	      cursor: pointer;
	      box-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.3);
	    }
      
	    #headerSwitchButton:hover {
	      background-color: darkgray;
	    }
	  `;

    button.addEventListener("click", () => {
      const topbar = document.querySelector(".AsanaBaseTopbar");

      const open = topbar.style.display === "none";
      openSidebar(open);
      openTopbar(".GlobalTopbar", open);
      openTopbar(".AsanaBaseTopbar", open);
    });
    document.body.appendChild(button);
    document.head.appendChild(style);
  }

  retry(() => {
    return openSidebar(false);
  });

  retry(() => {
    return openTopbar(".AsanaBaseTopbar", false);
  });

  retry(() => {
    return openTopbar(".GlobalTopbar", false);
  });

  addHeaderSwitchButton();
})();
