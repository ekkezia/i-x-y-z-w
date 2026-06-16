const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

function getR2Url(pathSegments) {
  const baseUrl = process.env.REACT_APP_R2_PUBLIC_URL;

  if (!baseUrl) {
    throw new Error("REACT_APP_R2_PUBLIC_URL is not configured");
  }

  const path = pathSegments.map((segment) => encodeURIComponent(segment)).join("/");
  return `${trimTrailingSlash(baseUrl)}/${path}`;
}

async function proxyR2Asset(request, context) {
  const sourceUrl = getR2Url(context.params.path);
  const range = request.headers.get("range");
  const upstream = await fetch(sourceUrl, {
    headers: range ? { range } : undefined,
  });

  const headers = new Headers();
  for (const key of [
    "accept-ranges",
    "cache-control",
    "content-length",
    "content-range",
    "content-type",
    "etag",
    "last-modified",
  ]) {
    const value = upstream.headers.get(key);
    if (value) {
      headers.set(key, value);
    }
  }
  headers.set("cache-control", headers.get("cache-control") || "public, max-age=31536000, immutable");

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}

export async function GET(request, context) {
  return proxyR2Asset(request, context);
}

export async function HEAD(request, context) {
  return proxyR2Asset(request, context);
}
