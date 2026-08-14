async (page) => {
  const url = 'https://dev-trugreen.com/_next/static/chunks/4623-90493399e7d90b18.8FHBh5TUoh_S3MFCzQPGh.js';
  const snippet = await page.evaluate(async (u) => {
    try {
      const res = await fetch(u);
      if (!res.ok) return `HTTP ${res.status} for ${u}`;
      const text = await res.text();
      return text.slice(133000, 134500);
    } catch (e) {
      return `Error: ${e.message}`;
    }
  }, url);
  return snippet;
}
