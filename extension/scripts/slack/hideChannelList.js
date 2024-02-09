(async function () {
  let focusViewMode = false;

  function getElements() {
    const nav = document.querySelector(".p-ia4_top_nav");
    const wrapper = document.querySelector(".p-client_workspace_wrapper");
    const workspace = document.querySelector(".p-client_workspace");
    const layout = document.querySelector(".p-client_workspace__layout");
    const secondary = document.querySelector(".p-view_contents--secondary");
    const resizers = document.querySelectorAll(".p-resizer");
    const controlStrip = document.querySelector(".p-control_strip");
    return {
      nav,
      wrapper,
      workspace,
      layout,
      secondary,
      resizers,
      controlStrip,
    };
  }

  function setFocusViewMode() {
    const {
      nav,
      wrapper,
      workspace,
      layout,
      secondary,
      resizers,
      controlStrip,
    } = getElements();

    nav.style.display = "none";

    wrapper.style.gridTemplateAreas = '"p-client-workspace"';
    wrapper.style.gridTemplateColumns = "100%";
    wrapper.style.gridTemplateRows = "100%";

    workspace.style.gridTemplateAreas = '"p-client_workspace__layout"';
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

    controlStrip.style.display = "none";

    resizers.forEach((e) => {
      e.style.display = "none";
    });
  }

  function unsetFocusViewMode() {
    const { nav, wrapper, workspace, layout, resizers, controlStrip } =
      getElements();

    nav.style.display = null;

    wrapper.style.gridTemplateAreas = null;
    wrapper.style.gridTemplateColumns = null;
    wrapper.style.gridTemplateRows = null;

    workspace.style.gridTemplateAreas = null;
    workspace.style.gridTemplateColumns = null;

    layout.style.gridTemplateAreas = null;
    layout.style.gridTemplateColumns = null;

    controlStrip.style.display = null;

    resizers.forEach((e) => {
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

  function toggleFocusViewMode() {
    focusViewMode = !focusViewMode;
    if (focusViewMode) {
      watchFocusViewMode();
    } else {
      unsetFocusViewMode();
    }
  }

  function addFocusViewButton() {
    const button = document.createElement("button");
    button.id = "headerSwitchButton";
    button.addEventListener("click", () => {
      toggleFocusViewMode();
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
    const { nav, wrapper, workspace, layout, controlStrip } = getElements();
    if (!nav || !wrapper || !workspace || !layout || !controlStrip)
      return false;

    document.addEventListener("keydown", function (event) {
      console.log(event.key, event.shiftKey, event.ctrlKey, event);
      if (event.shiftKey && event.ctrlKey && event.key === "C") {
        toggleFocusViewMode();
      }
    });

    const disableFocusViewMode =
      new URLSearchParams(location.search).get("disableFocusViewMode") === "1";

    focusViewMode = !disableFocusViewMode;
    watchFocusViewMode();
    addFocusViewButton();
    return true;
  });
})();
