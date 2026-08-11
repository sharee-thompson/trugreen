import { getBaseUrl, getLandingPageUrl } from "../../utils/config";
import { landingPagePaths } from "../../utils/paths";

export type PerformancePageGroup =
  | "core"
  | "landing-pages"
  | "lawn-care-plans"
  | "service-pages"
  | "branch-samples"
  | "content-pages"
  | "support"
  | "blog";

type PerformancePageDefinition = {
  key: string;
  path: string;
  group: PerformancePageGroup;
  includeInDefaultAudit: boolean;
};

export type PerformancePageScope =
  | "default-audit"
  | "all-configured"
  | "sampling"
  | PerformancePageGroup;

const SAMPLING_PAGE_KEYS = new Set([
  "home",
  "products-and-services",
  "customer-support",
  "lp-high",
  "trupro",
  "lawn-fertilization",
  "branch-chattanooga-tn",
  "lawn-care-101",
  "pay-your-bill",
  "blog-landing",
]);

export type PerformancePage = {
  key: string;
  url: string;
  group: PerformancePageGroup;
  includeInDefaultAudit: boolean;
};

const performancePageDefinitions: PerformancePageDefinition[] = [
  {
    key: "home",
    path: "/",
    group: "core",
    includeInDefaultAudit: true,
  },
  {
    key: "products-and-services",
    path: "/products-and-services",
    group: "core",
    includeInDefaultAudit: true,
  },
  {
    key: "customer-support",
    path: "/customer-support",
    group: "support",
    includeInDefaultAudit: true,
  },
  {
    key: "lawn-care-101",
    path: "/lawn-care-101",
    group: "content-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "lp-high",
    path: landingPagePaths.high,
    group: "landing-pages",
    includeInDefaultAudit: true,
  },
  {
    key: "lp-medium",
    path: landingPagePaths.medium,
    group: "landing-pages",
    includeInDefaultAudit: true,
  },
  {
    key: "lp-low",
    path: landingPagePaths.low,
    group: "landing-pages",
    includeInDefaultAudit: true,
  },
  {
    key: "trupro",
    path: "/products-and-services/trupro",
    group: "lawn-care-plans",
    includeInDefaultAudit: false,
  },
  {
    key: "trucore",
    path: "/products-and-services/trucore",
    group: "lawn-care-plans",
    includeInDefaultAudit: false,
  },
  {
    key: "natural-lawn-care",
    path: "/products-and-services/natural-lawn-care",
    group: "lawn-care-plans",
    includeInDefaultAudit: false,
  },
  {
    key: "trubasic",
    path: "/products-and-services/trubasic",
    group: "lawn-care-plans",
    includeInDefaultAudit: false,
  },
  {
    key: "lawn-fertilization",
    path: "/products-and-services/lawn-fertilization",
    group: "service-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "lawn-stress-guard",
    path: "/products-and-services/lawn-stress-guard",
    group: "service-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "weed-control",
    path: "/products-and-services/weed-control",
    group: "service-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "aeration",
    path: "/products-and-services/aeration",
    group: "service-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "grub-control",
    path: "/products-and-services/grub-control",
    group: "service-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "ph-and-soil-analysis",
    path: "/products-and-services/ph-and-soil-analysis",
    group: "service-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "lawn-disease",
    path: "/products-and-services/lawn-disease",
    group: "service-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "testimonials-and-ratings",
    path: "/why-choose-trugreen/testimonials-and-ratings",
    group: "content-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "branch-chattanooga-tn",
    path: "/local-lawn-care/tennessee/chattanooga",
    group: "branch-samples",
    includeInDefaultAudit: false,
  },
  {
    key: "branch-lees-summit-mo",
    path: "/local-lawn-care/missouri/lees-summit",
    group: "branch-samples",
    includeInDefaultAudit: false,
  },
  {
    key: "branch-sacramento-ca",
    path: "/local-lawn-care/california/sacramento",
    group: "branch-samples",
    includeInDefaultAudit: false,
  },
  {
    key: "newsroom-executive-staff",
    path: "/newsroom/executive-staff#about",
    group: "content-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "terms",
    path: "/about/terms",
    group: "content-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "privacy-policy",
    path: "/about/privacy-policy",
    group: "content-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "faqs",
    path: "/lawn-care-101/faqs",
    group: "content-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "newsroom",
    path: "/newsroom",
    group: "content-pages",
    includeInDefaultAudit: false,
  },
  {
    key: "blog-landing",
    path: "/lawn-care-101/blog",
    group: "blog",
    includeInDefaultAudit: false,
  },
  {
    key: "login",
    path: "/my-account/login",
    group: "support",
    includeInDefaultAudit: false,
  },
  {
    key: "registration",
    path: "/my-account/registration",
    group: "support",
    includeInDefaultAudit: false,
  },
  {
    key: "pay-your-bill",
    path: "/pay-your-bill",
    group: "support",
    includeInDefaultAudit: false,
  },
] as const;

function parsePageKeyFilter(value: string | undefined): Set<string> | null {
  if (!value) {
    return null;
  }

  const keys = value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return keys.length > 0 ? new Set(keys) : null;
}

function parsePageScope(
  value: string | undefined,
): PerformancePageScope | null {
  if (!value) {
    return null;
  }

  if (
    value === "all-configured" ||
    value === "default-audit" ||
    value === "sampling"
  ) {
    return value;
  }

  const matchingGroup = (
    [
      "core",
      "landing-pages",
      "lawn-care-plans",
      "service-pages",
      "branch-samples",
      "content-pages",
      "support",
      "blog",
    ] as const
  ).find((group) => group === value);

  return matchingGroup ?? null;
}

function resolvePageUrl(path: string, group: PerformancePageGroup): string {
  if (group === "landing-pages") {
    return getLandingPageUrl(path, { automation: false });
  }

  return getBaseUrl(path, { automation: false });
}

export function getConfiguredPerformancePages(): PerformancePage[] {
  const selectedKeys = parsePageKeyFilter(process.env.PERFORMANCE_PAGE_KEYS);
  const selectedScope = parsePageScope(process.env.PERFORMANCE_PAGE_SCOPE);

  return performancePageDefinitions
    .filter((page) => {
      if (selectedKeys) {
        return selectedKeys.has(page.key);
      }

      if (selectedScope === "all-configured") {
        return true;
      }

      if (selectedScope === "sampling") {
        return SAMPLING_PAGE_KEYS.has(page.key);
      }

      if (selectedScope && selectedScope !== "default-audit") {
        return page.group === selectedScope;
      }

      return page.includeInDefaultAudit;
    })
    .map((page) => ({
      key: page.key,
      group: page.group,
      includeInDefaultAudit: page.includeInDefaultAudit,
      url: resolvePageUrl(page.path, page.group),
    }));
}

export function getAllPerformancePageDefinitions(): PerformancePage[] {
  return performancePageDefinitions.map((page) => ({
    key: page.key,
    group: page.group,
    includeInDefaultAudit: page.includeInDefaultAudit,
    url: resolvePageUrl(page.path, page.group),
  }));
}
