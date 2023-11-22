async function sleep(interval) {
  await new Promise((resolve) => setTimeout(resolve, interval));
}

async function retry(func, { interval = 200, maxRetry = 25, n = 0 } = {}) {
  if (maxRetry !== null && n >= maxRetry) return false;

  if (func(n)) return true;

  await sleep(interval);
  return await retry(func, { interval, maxRetry, n: n + 1 });
}
