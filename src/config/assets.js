const trimLeadingSlash = (value) => value.replace(/^\/+/, "");

export const assetBaseUrl = process.env.REACT_APP_R2_PUBLIC_URL || "";

export function getAssetUrl(path) {
  if (!assetBaseUrl) {
    throw new Error("REACT_APP_R2_PUBLIC_URL is not configured");
  }

  return `/api/r2/${trimLeadingSlash(path)}`;
}
