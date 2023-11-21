(async function () {
  const res = location.href.match(
    /^(https:\/\/app\.asana\.com\/0\/[0-9]+\/[0-9]+)\/?$/
  );
  if (res !== null && res[1] !== undefined) {
    location.href = res[1] + "/f";
  }
})();
