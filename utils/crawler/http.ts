import type { APIRequestContext } from "@playwright/test";

export async function checkUrl(
  request: APIRequestContext,
  url: string,
): Promise<{ status: number | null; ok: boolean; error?: string }> {
  try {
    const headResponse = await request.fetch(url, {
      method: "HEAD",
      failOnStatusCode: false,
      timeout: 15000,
    });

    // Many sites block or mis-handle HEAD, so fall back to GET when needed.
    if (headResponse.status() >= 400 || headResponse.status() === 405) {
      const getResponse = await request.fetch(url, {
        method: "GET",
        failOnStatusCode: false,
        timeout: 20000,
      });
      return {
        status: getResponse.status(),
        ok: getResponse.status() < 400,
      };
    }

    return {
      status: headResponse.status(),
      ok: headResponse.status() < 400,
    };
  } catch (error) {
    return {
      status: null,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function fetchPageHtml(
  request: APIRequestContext,
  url: string,
): Promise<{
  ok: boolean;
  status: number | null;
  html?: string;
  error?: string;
}> {
  let lastError: string | undefined;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await request.fetch(url, {
        method: "GET",
        failOnStatusCode: false,
        timeout: 45000,
      });

      const status = response.status();
      if (status >= 400) {
        return { ok: false, status };
      }

      const contentType = response.headers()["content-type"] || "";
      if (!contentType.includes("text/html")) {
        return {
          ok: false,
          status,
          error: `Non-HTML content-type: ${contentType}`,
        };
      }

      const html = await response.text();
      return { ok: true, status, html };
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  return { ok: false, status: null, error: lastError };
}
