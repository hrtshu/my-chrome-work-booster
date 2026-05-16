(async function () {
  const style = document.createElement("style");
  style.textContent = `
	  button[class*='sidebarBannerUnreads'] { display: none; } /* 「その他の未読メッセージ」 */
	  .p-tab_rail__button--home > .p-unread_dot {display: none;} /* Homeアイコンの未読ドット */
	`;
  document.head.appendChild(style);
})();
