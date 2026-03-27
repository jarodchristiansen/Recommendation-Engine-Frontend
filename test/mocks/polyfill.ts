/**
 * Polyfill fetch/Response for MSW in Jest (jsdom does not provide these).
 * Must be imported before any msw/node code.
 */
import { fetch, Headers, Request, Response } from "undici";

const withFetch = globalThis as typeof globalThis & {
  fetch?: typeof fetch;
  Headers?: typeof Headers;
  Request?: typeof Request;
  Response?: typeof Response;
};

if (typeof withFetch.Response === "undefined") {
  withFetch.Response = Response;
  withFetch.Request = Request;
  withFetch.Headers = Headers;
  withFetch.fetch = fetch;
}

export {};
