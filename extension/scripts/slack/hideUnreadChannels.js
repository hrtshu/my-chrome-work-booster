(async function () {
  const hideUnreadChannels =
    document.cookie.includes("hide-unread-channels=1") ||
    new URLSearchParams(location.search).get("hideUnreadChannels") === "1";

  const showUnreadChannels =
    new URLSearchParams(location.search).get("showUnreadChannels") === "1";

  if (showUnreadChannels || !hideUnreadChannels) return;

  const style = document.createElement("style");
  style.textContent = `.p-channel_sidebar__channel--unread:not(.p-channel_sidebar__channel--muted,.p-channel_sidebar__channel--suggested) .p-channel_sidebar__name,
    .p-channel_sidebar__section_heading--collapsed .p-channel_sidebar__section_heading_label--unreads,
    .c-channel_entity__name--bold,
    .p-channel_sidebar__section_heading--unreads {
      font-weight: inherit !important;
      color: inherit !important;
  }`;
  document.head.appendChild(style);
})();
