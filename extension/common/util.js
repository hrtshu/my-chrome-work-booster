async function sleep(interval) {
  await new Promise((resolve) => setTimeout(resolve, interval));
}

async function retry(func, interval = 100, maxRetry = 50, n = 0) {
  if (maxRetry !== null && n >= maxRetry) return false;

  if (func(n)) return true;

  await sleep(interval);
  return await retry(func, interval, maxRetry, n + 1);
}
