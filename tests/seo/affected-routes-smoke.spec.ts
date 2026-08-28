import { test, expect } from "@playwright/test";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { getBaseUrl } from "../../utils/config";

test.setTimeout(600000);

const BASE_URL = (
  process.env.BASE_URL || getBaseUrl({ automation: false })
).replace(/\/$/, "");
const SAMPLES = parseInt(process.env.SAMPLES || "3", 10);
const TTFB_WARN_MS = parseInt(process.env.TTFB_WARN_MS || "1000", 10);

const ROUTES = [
  "/",
  "/about/california-privacy-policy",
  "/about/privacy-policy",
  "/about/sms-terms",
  "/about/terms",
  "/aftercare",
  "/appointment-scheduler",
  "/customer-support",
  "/lawn-care-101",
  "/lawn-care-101/blog",
  "/lawn-care-101/faqs",
  "/lawn-care-101/learning-center",
  "/lawn-care-101/learning-center/lawn-diseases/brown-patch",
  "/lawn-care-101/learning-center/search",
  "/local-lawn-care",
  "/local-lawn-care/alabama",
  "/local-lawn-care/alabama/birmingham",
  "/local-lawn-care/alabama/huntsville",
  "/local-lawn-care/alabama/montgomery",
  "/myservicesummary",
  "/my-account/globalError",
  "/my-account/reset-password",
  "/newsroom",
  "/newsroom/executive-staff",
  "/newsroom/executive-staff/kurt-kane",
  "/pay-your-bill",
  "/ppc/landing-page",
  "/nb/ppc/landing-page",
  "/b/ppc/landing-page",
  "/pests-products-and-services",
  "/products-and-services",
  "/products-and-services/trupro",
  "/products-and-services/trucore",
  "/products-and-services/truyou",
  "/products-and-services/natural-lawn-care",
  "/products-and-services/trubasic",
  "/products-and-services/lawn-fertilization",
  "/products-and-services/weed-control",
  "/products-and-services/aeration",
  "/products-and-services/lawn-disease",
  "/products-and-services/ph-and-soil-analysis",
  "/products-and-services/trushrub-tree-and-shrub-care",
  "/products-and-services/trudefense-mosquito-control",
  "/products-and-services/trubarrier-perimeter-pest-control",
  "/products-and-services/flea-tick-outdoor-nuisance-pest-control",
  "/products-and-services/fire-ant-control",
  "/products-and-services/grub-control",
  "/products-and-services/mosquito-plan-supplement",
  "/products-and-services/lawn-stress-guard",
  "/searchResult",
  "/service-terms-and-conditions",
  "/why-choose-trugreen/testimonials-and-ratings",
];

type RouteResult = {
  route: string;
  status: number | null;
  title: string | null;
  description: string | null;
  canonical: string | null;
  ogTitle: string | null;
  twitterTitle: string | null;
  ttfbMs: number | null;
  titleInHead: boolean;
  descInHead: boolean;
  canonicalInHead: boolean;
  titleNotInBody: boolean;
  descNotInBody: boolean;
  titleStatus: "ok" | "missing" | "in-body" | "generic";
  descStatus: "ok" | "missing" | "in-body" | "generic";
  canonicalStatus: "ok" | "missing" | "in-body" | "generic";
  ttfbWarning: boolean;
  errors: string[];
};

function formatMs(n: number | null) {
  return n === null || Number.isNaN(n) ? "N/A" : n.toFixed(1);
}

function escapeMd(s: string | null) {
  return (s || "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function truncate(str: string | null, max: number) {
  const s = str || "";
  return s.length > max ? s.slice(0, max - 3) + "..." : s;
}

function extractMeta(html: string) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const descMatch = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
  );
  const canonicalMatch = html.match(
    /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i,
  );
  const ogTitleMatch = html.match(
    /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i,
  );
  const twitterTitleMatch = html.match(
    /<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']*)["'][^>]*>/i,
  );

  return {
    title: titleMatch?.[1]?.trim() || null,
    description: descMatch?.[1]?.trim() || null,
    canonical: canonicalMatch?.[1]?.trim() || null,
    ogTitle: ogTitleMatch?.[1]?.trim() || null,
    twitterTitle: twitterTitleMatch?.[1]?.trim() || null,
    rawTitle: titleMatch?.[0] || null,
    rawDesc: descMatch?.[0] || null,
    rawCanonical: canonicalMatch?.[0] || null,
  };
}

function tagPlacement(html: string, raw: string | null) {
  if (!raw) return { inHead: false, inBody: false };
  const headClose = html.indexOf("</head>");
  const idx = html.indexOf(raw);
  const inHead = headClose > -1 && idx >= 0 && idx < headClose;
  const inBody =
    headClose > -1 &&
    html.slice(headClose).indexOf(raw.split(/[>]/)[0] + ">") > -1;
  return { inHead, inBody };
}

async function getHtmlAndTtfb(
  url: string,
): Promise<{ status: number; html: string; ttfbMs: number | null }> {
  const times: number[] = [];
  let status = 0;
  let html = "";

  for (let i = 0; i < SAMPLES; i++) {
    const start = performance.now();
    let res: Response;
    try {
      res = await fetch(url, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      });
    } catch (err) {
      console.warn(`Fetch failed for ${url}:`, err);
      return { status: 0, html: "", ttfbMs: null };
    }
    const ttfb = performance.now() - start;
    times.push(ttfb);
    status = res.status;
    try {
      html = await res.text();
    } catch (err) {
      console.warn(`Failed to read body for ${url}:`, err);
      return { status, html: "", ttfbMs: null };
    }
  }

  times.sort((a, b) => a - b);
  const ttfbMs = times[Math.floor(times.length / 2)];
  return { status, html, ttfbMs };
}

function buildMarkdown(homepage: any, results: RouteResult[]) {
  const lines = [
    "# Affected Routes Smoke, Metadata and TTFB Report",
    "",
    `Base URL: ${BASE_URL}`,
    `Date: ${new Date().toISOString().split("T")[0]}`,
    `Samples per route: ${SAMPLES}`,
    "",
    "## Summary",
    "",
    `- Routes checked: ${results.length}`,
    `- Routes with 2xx status: ${results.filter((r) => r.status && r.status < 400).length}`,
    `- Missing title: ${results.filter((r) => r.titleStatus === "missing").length}`,
    `- Missing description: ${results.filter((r) => r.descStatus === "missing").length}`,
    `- Generic title (non-homepage): ${results.filter((r) => r.route !== "/" && r.titleStatus === "generic").length}`,
    `- Generic description (non-homepage): ${results.filter((r) => r.route !== "/" && r.descStatus === "generic").length}`,
    `- TTFB warnings (> ${TTFB_WARN_MS} ms): ${results.filter((r) => r.ttfbWarning).length}`,
    `- Routes with errors: ${results.filter((r) => r.errors.length > 0).length}`,
    "",
    "## Results",
    "",
    "| Route | Status | Title | Title status | Description | Desc status | Canonical | TTFB (ms) | Warnings |",
    "|---|---|---|---|---|---|---|---|---|",
    ...results.map((r) => {
      const warn =
        [
          r.ttfbWarning ? "TTFB" : "",
          ...r.errors.filter(
            (e) =>
              !e.startsWith("title") &&
              !e.startsWith("description") &&
              !e.startsWith("canonical"),
          ),
        ]
          .filter(Boolean)
          .join(", ") || "none";
      return `| ${escapeMd(r.route)} | ${r.status ?? "ERR"} | ${truncate(escapeMd(r.title), 35)} | ${r.titleStatus} | ${truncate(escapeMd(r.description), 35)} | ${r.descStatus} | ${truncate(escapeMd(r.canonical), 30)} | ${formatMs(r.ttfbMs)} | ${escapeMd(warn)} |`;
    }),
    "",
    "## Legend",
    "",
    "- `status`: HTTP status code (`ERR` means request failed).",
    "- `title/desc status`: `ok`, `missing`, `in-body`, or `generic`.",
    "- `generic` means the value matches the homepage.",
    "- `TTFB`: median time to first byte across samples.",
    `- TTFB warning threshold is ${TTFB_WARN_MS} ms.`,
  ];

  if (results.some((r) => r.errors.length > 0)) {
    lines.push(
      "",
      "## Errors",
      "",
      ...results
        .filter((r) => r.errors.length > 0)
        .map((r) => `- **${r.route}**: ${r.errors.join("; ")}`),
    );
  }

  return lines.join("\n");
}

test(
  "smoke, metadata and TTFB for all affected routes @seo @functional @metadata",
  { tag: ["@seo", "@functional", "@metadata"] },
  async () => {
    const homepageRes = await getHtmlAndTtfb(`${BASE_URL}/`);
    if (!homepageRes.html) {
      throw new Error(`Homepage ${BASE_URL}/ did not return a usable response`);
    }

    const homepageMeta = extractMeta(homepageRes.html);

    const results: RouteResult[] = [];

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route}`;
      const { status, html, ttfbMs } = await getHtmlAndTtfb(url);
      const errors: string[] = [];

      if (status === 0) {
        errors.push("request failed");
      } else if (status >= 500) {
        errors.push(`server error ${status}`);
      } else if (status >= 400) {
        errors.push(`client error ${status}`);
      }

      const meta =
        status >= 200 && status < 400 ? extractMeta(html) : extractMeta("");

      const titlePlacement = tagPlacement(html, meta.rawTitle);
      const descPlacement = tagPlacement(html, meta.rawDesc);
      const canonicalPlacement = tagPlacement(html, meta.rawCanonical);

      const titleStatus: RouteResult["titleStatus"] = !meta.title
        ? "missing"
        : !titlePlacement.inHead
          ? "in-body"
          : route === "/"
            ? "ok"
            : meta.title === homepageMeta.title
              ? "generic"
              : "ok";

      const descStatus: RouteResult["descStatus"] = !meta.description
        ? "missing"
        : !descPlacement.inHead
          ? "in-body"
          : route === "/"
            ? "ok"
            : meta.description === homepageMeta.description
              ? "generic"
              : "ok";

      const canonicalStatus: RouteResult["canonicalStatus"] = !meta.canonical
        ? "missing"
        : !canonicalPlacement.inHead
          ? "in-body"
          : route === "/"
            ? "ok"
            : meta.canonical === `${BASE_URL}/` || meta.canonical === BASE_URL
              ? "generic"
              : "ok";

      if (titleStatus === "missing") errors.push("title missing");
      if (titleStatus === "in-body") errors.push("title not in <head>");
      if (descStatus === "missing") errors.push("description missing");
      if (descStatus === "in-body") errors.push("description not in <head>");
      if (canonicalStatus === "missing") errors.push("canonical missing");
      if (canonicalStatus === "in-body") errors.push("canonical not in <head>");

      const ttfbWarning = ttfbMs !== null && ttfbMs > TTFB_WARN_MS;

      results.push({
        route,
        status,
        title: meta.title,
        description: meta.description,
        canonical: meta.canonical,
        ogTitle: meta.ogTitle,
        twitterTitle: meta.twitterTitle,
        ttfbMs,
        titleInHead: titlePlacement.inHead,
        descInHead: descPlacement.inHead,
        canonicalInHead: canonicalPlacement.inHead,
        titleNotInBody: !titlePlacement.inBody,
        descNotInBody: !descPlacement.inBody,
        titleStatus,
        descStatus,
        canonicalStatus,
        ttfbWarning,
        errors,
      });

      expect(errors.length, `errors on ${route}: ${errors.join("; ")}`).toBe(0);
    }

    const report = buildMarkdown(homepageMeta, results);
    const reportPath = path.resolve(
      process.cwd(),
      "affected-routes-smoke-report.md",
    );
    writeFileSync(reportPath, report, "utf8");

    console.log(`\nReport written to: ${reportPath}`);
    console.table(
      results.map((r) => ({
        route: r.route,
        status: r.status ?? "ERR",
        title: truncate(r.title, 30),
        titleStatus: r.titleStatus,
        descStatus: r.descStatus,
        ttfb: formatMs(r.ttfbMs),
      })),
    );
  },
);
