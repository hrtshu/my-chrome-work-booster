(async function () {
  let focusViewMode = false;

  function setFocusViewMode() {
    const nav = document.querySelector(".p-ia4_top_nav");
    const workspace = document.querySelector(
      ".p-client_workspace--including_tab_rail"
    );
    const layout = document.querySelector(".p-client_workspace__layout");
    const secondary = document.querySelector(".p-view_contents--secondary");

    nav.style.display = "none";

    workspace.style.gridTemplateAreas = '"p-client-workspace"';
    workspace.style.gridTemplateColumns = "100%";
    workspace.style.gridTemplateRows = "100%";

    if (secondary) {
      layout.style.gridTemplateAreas =
        '"p-view_contents--sidebar p-view_contents--primary p-view_contents--secondary"';
      layout.style.gridTemplateColumns = "0 0 auto";
    } else {
      layout.style.gridTemplateAreas =
        '"p-view_contents--sidebar p-view_contents--primary"';
      layout.style.gridTemplateColumns = "0 auto";
    }

    document.querySelectorAll(".p-resizer").forEach((e) => {
      e.style.display = "none";
    });
  }

  function unsetFocusViewMode() {
    const nav = document.querySelector(".p-ia4_top_nav");
    const workspace = document.querySelector(
      ".p-client_workspace--including_tab_rail"
    );
    const layout = document.querySelector(".p-client_workspace__layout");

    nav.style.display = null;

    workspace.style.gridTemplateAreas = null;
    workspace.style.gridTemplateColumns = null;

    layout.style.gridTemplateAreas = null;
    layout.style.gridTemplateColumns = null;

    document.querySelectorAll(".p-resizer").forEach((e) => {
      e.style.display = null;
    });
  }

  function watchFocusViewMode() {
    retry(
      () => {
        if (!focusViewMode) return true;

        setFocusViewMode();
        return false;
      },
      { maxRetry: null }
    );
  }

  function addFocusViewButton() {
    const button = document.createElement("button");
    button.id = "headerSwitchButton";
    button.addEventListener("click", () => {
      focusViewMode = !focusViewMode;

      if (focusViewMode) {
        watchFocusViewMode();
      } else {
        unsetFocusViewMode();
      }
    });
    document.body.appendChild(button);

    const style = document.createElement("style");
    style.textContent = `
      #headerSwitchButton {
        width: 18px;
        height: 18px;
        position: fixed;
        top: 3px;
        right: 3px;
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
    document.head.appendChild(style);
  }

  retry(() => {
    const nav = document.querySelector(".p-ia4_top_nav");
    const workspace = document.querySelector(
      ".p-client_workspace--including_tab_rail"
    );
    const layout = document.querySelector(".p-client_workspace__layout");
    if (!nav || !workspace || !layout) return false;

    focusViewMode = true;
    watchFocusViewMode();
    addFocusViewButton();
    return true;
  });
})();
