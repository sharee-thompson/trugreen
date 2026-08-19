async (page) => {
  const trackingHosts = new Set([
    'googletagmanager.com',
    'google-analytics.com',
    'analytics.google.com',
    'mouseflow.com',
    'facebook.com',
    'connect.facebook.net',
    'bing.com',
    'bat.bing.com',
    'doubleclick.net',
    'googleads.g.doubleclick.net',
    'ad.doubleclick.net',
    'cm.g.doubleclick.net',
    'trkn.us',
    'ict.infinity-tracking.net',
    'infinity-tracking.net',
    'nas.lon.infinity-tracking.net',
    'optimizely.com',
    'cdn.optimizely.com',
    'logx.optimizely.com',
    'pinterest.com',
    'ct.pinterest.com',
    'qualtrics.com',
    'siteintercept.qualtrics.com',
    'wisepops.net',
    'micpn.com',
    'zoominfo.com',
    'ws.zoominfo.com',
    'airpr.com',
    'px.airpr.com',
    'aria.microsoft.com',
    'browser.pipe.aria.microsoft.com'
  ]);

  const isTrackingUrl = (url) => {
    try {
      const u = new URL(url);
      const host = u.hostname.toLowerCase();
      if (trackingHosts.has(host)) return true;
      for (const h of trackingHosts) {
        if (host.endsWith('.' + h)) return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const trackingTextKeywords = [
    'googletagmanager',
    'gtm-',
    'google-analytics',
    'analytics.js',
    'gtag/js',
    'mouseflow',
    'fbevents',
    'bat.bing',
    'googleads',
    'doubleclick',
    'trkn.us',
    'ict.infinity',
    'infinity-tracking',
    'infinitytrack',
    'optimizely',
    'qualtrics',
    'wisepops',
    'micpn',
    'zoominfo',
    'pinterest',
    'aria.microsoft',
    'airpr'
  ];

  const isTrackingText = (text) => {
    if (!text) return false;
    const t = text.toLowerCase();
    return trackingTextKeywords.some(k => t.includes(k));
  };

  const urls = [
    'https://dev-trugreen.com/',
    'https://dev-trugreen.com/home-a',
    'https://dev-trugreen.com/home-b',
    'https://dev-trugreen.com/home-c',
    'https://dev-trugreen.com/local-lawn-care',
    'https://dev-trugreen.com/lawn-care',
    'https://dev-trugreen.com/why-choose-trugreen/testimonials-and-ratings',
    'https://dev-trugreen.com/aftercare',
    'https://dev-trugreen.com/lawn-care-101',
    'https://dev-trugreen.com/lawn-care-101/learning-center',
    'https://dev-trugreen.com/lawn-care-101/faqs',
    'https://dev-trugreen.com/lawn-care-101/learning-center/grasses/brown-patch',
    'https://dev-trugreen.com/about/terms',
    'https://dev-trugreen.com/about/privacy-policy',
    'https://dev-trugreen.com/about/sms-terms',
    'https://dev-trugreen.com/about/california-privacy-policy',
    'https://dev-trugreen.com/service-terms-and-conditions'
  ];

  const results = [];

  for (const url of urls) {
    const consoleErrors = [];
    const pageErrors = [];
    const networkErrors = [];
    const trackingNetwork = [];

    const onConsole = (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push({ text: msg.text(), location: msg.location() });
      }
    };
    const onPageError = (err) => {
      pageErrors.push(String(err.stack || err.message || err));
    };
    const onResponse = (res) => {
      if (res.status() >= 400) {
        const u = res.url();
        const entry = { url: u, status: res.status(), statusText: res.statusText() };
        if (isTrackingUrl(u)) {
          trackingNetwork.push(entry);
        } else {
          networkErrors.push(entry);
        }
      }
    };
    const onRequestFailed = (req) => {
      const u = req.url();
      const entry = { url: u, failure: req.failure()?.errorText || 'request failed' };
      if (isTrackingUrl(u)) {
        trackingNetwork.push(entry);
      } else {
        networkErrors.push(entry);
      }
    };

    page.on('console', onConsole);
    page.on('pageerror', onPageError);
    page.on('response', onResponse);
    page.on('requestfailed', onRequestFailed);

    let status = null;
    let docError = null;
    try {
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000);
      status = resp ? resp.status() : 'no response';
    } catch (e) {
      docError = e.message;
      status = 'navigation failed';
    }

    page.off('console', onConsole);
    page.off('pageerror', onPageError);
    page.off('response', onResponse);
    page.off('requestfailed', onRequestFailed);

    const significantConsole = consoleErrors.filter((m) => {
      if (isTrackingText(m.text)) return false;
      const foundUrl = m.text.match(/https?:\/\/[^\s'"<>]+/)?.[0];
      if (foundUrl && isTrackingUrl(foundUrl)) return false;
      return true;
    }).map(m => m.text);

    const significantPageErrors = pageErrors.filter(s => !isTrackingText(s));
    const docErrList = [];
    if (docError) docErrList.push(`Navigation error: ${docError}`);
    if (typeof status === 'number' && status >= 400) {
      docErrList.push(`Document HTTP ${status}`);
    }

    results.push({
      url,
      status,
      significant: [
        ...docErrList,
        ...networkErrors.map(n => `${n.status || n.failure}: ${n.url}`),
        ...significantConsole,
        ...significantPageErrors
      ],
      ignoredConsole: consoleErrors.filter(m => !significantConsole.includes(m.text)).map(m => m.text),
      ignoredNetwork: trackingNetwork
    });
  }

  let md = '# Playwright Local Test Report - TLS Removal\n\n';
  md += 'Generated: ' + new Date().toISOString() + '\n\n';
  md += 'Base: https://dev-trugreen.com/\n\n';
  md += '## Summary\n\n';
  md += '| URL | Status | Significant Errors | Ignored Tracking (console+network) |\n';
  md += '|---|---|---|---|\n';
  for (const r of results) {
    const sig = r.significant.length;
    const status = r.status === 'navigation failed' ? `**${r.status}**` : r.status;
    const ignoredCount = r.ignoredConsole.length + r.ignoredNetwork.length;
    const icon = sig === 0 ? 'PASS' : (r.status === 'navigation failed' ? 'NAV FAIL' : 'ERRORS');
    md += `| [${r.url}](${r.url}) | ${status} | ${icon} (${sig}) | ${ignoredCount} |\n`;
  }

  md += '\n## Significant (non-tracking) errors\n\n';
  let anySig = false;
  for (const r of results) {
    if (r.significant.length > 0) {
      anySig = true;
      md += `### ${r.url} (status: ${r.status})\n\n`;
      for (const e of r.significant.slice(0, 25)) {
        md += `- ${e}\n`;
      }
      if (r.significant.length > 25) {
        md += `- ... and ${r.significant.length - 25} more\n`;
      }
      md += '\n';
    }
  }
  if (!anySig) {
    md += 'No significant non-tracking errors found.\n\n';
  }

  md += '## Ignored tracking/analytics noise\n\n';
  let anyIgnored = false;
  for (const r of results) {
    if (r.ignoredConsole.length > 0 || r.ignoredNetwork.length > 0) {
      anyIgnored = true;
      md += `### ${r.url}\n\n`;
      md += `Ignored console: ${r.ignoredConsole.length}, ignored network: ${r.ignoredNetwork.length}\n\n`;
      const samples = r.ignoredConsole.slice(0, 5);
      for (const s of samples) {
        md += `- ${s}\n`;
      }
      const netSamples = r.ignoredNetwork.slice(0, 5).map(n => `${n.status || n.failure}: ${n.url}`);
      for (const s of netSamples) {
        md += `- ${s}\n`;
      }
      const totalSamples = samples.length + netSamples.length;
      const total = r.ignoredConsole.length + r.ignoredNetwork.length;
      if (total > totalSamples) {
        md += `- ... and ${total - totalSamples} more\n`;
      }
      md += '\n';
    }
  }
  if (!anyIgnored) {
    md += 'No tracking/analytics errors were ignored.\n';
  }

  return md;
}
