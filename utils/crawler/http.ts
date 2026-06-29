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