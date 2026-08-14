async (page) => {
  const res = await page.goto('https://dev-trugreen.com/lawn-care-101', { waitUntil: 'domcontentloaded', timeout: 60000 });
  const status = res ? res.status() : 'no res';
  const html = await page.content();
  const match = html.match(/Failed to construct 'Image'[\s\S]{0,2000}/);
  return { status, snippet: match ? match[0].slice(0, 2000) : html.slice(0, 500) };
}
