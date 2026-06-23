export function extractAnchorHrefs(html: string): string[] {
  const hrefs: string[] = [];
  const anchorHrefRegex = /<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi;

  let match: RegExpExecArray | null = anchorHrefRegex.exec(html);
  while (match) {
    const href = match[2]?.trim();
    if (href) {
      hrefs.push(href);
    }
    match = anchorHrefRegex.exec(html);
  }

  return hrefs;
}
