/** Normalized error message from a non-OK JSON API body (Next route proxies, etc.). */
export type ApiErrorBody = {
  error?: unknown;
  detail?: unknown;
};

export function errorMessageFromApiBody(result: ApiErrorBody): string {
  if (typeof result.error === "string") return result.error;
  if (typeof result.detail === "string") return result.detail;
  const fallback = result.detail ?? result.error;
  if (fallback !== undefined && fallback !== null) {
    return JSON.stringify(fallback);
  }
  return "Request failed";
}
