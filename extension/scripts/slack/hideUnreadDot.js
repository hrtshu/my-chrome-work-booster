(async function () {
  const style = document.createElement("style");
  style.textContent = `
	  .p-channel_sidebar--iap1 .p-channel_sidebar__banner, .p-drag_layer .p-channel_sidebar__banner { display: none; } /* 「その他の未読メッセージ」 */
	  .p-tab_rail__button--home > .p-unread_dot {display: none;} /* Homeアイコンの未読ドット */
	`;
  document.head.appendChild(style);
})();
