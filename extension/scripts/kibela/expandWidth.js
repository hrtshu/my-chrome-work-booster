(async function () {
  let wideStyle = null;

  const width = 1000;

  function addStyle() {
    const style = document.createElement("style");
    style.textContent = `
      .noteContainer-main, .l-editor-bodyWrapper.is-richTextEditor, .l-noteContainer-main {
        max-width: ${width}px;
      }
      .noteContainer-main-inner {
        max-width: ${width}px;
      }
    `;

    document.body.appendChild(style);
    wideStyle = style;
  }

  retry(
    () => {
      const fullWidthButton = document.querySelector(
        ".noteContainer-fullWidthButton"
      );
      if (!fullWidthButton) return false;

      if (fullWidthButton.title === "表示幅を元に戻す") {
        if (wideStyle !== null) {
          wideStyle.remove();
          wideStyle = null;
        }
      } else {
        if (wideStyle === null) addStyle();
      }
    },
    200,
    null
  );
})();
