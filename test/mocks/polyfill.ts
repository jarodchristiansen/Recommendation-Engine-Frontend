/**
 * Polyfill fetch/Response for MSW in Jest (jsdom does not provide these).
 * Must be imported before any msw/node code.
 *
 * Undici's fetch types differ from lib.dom (ReadableStream generics); we patch globals as `unknown`.
 */
import { fetch, Headers, Request, Response } from "undici";

const patchable = globalThis as unknown as {
  Response?: unknown;
  Request?: unknown;
  Headers?: unknown;
  fetch?: unknown;
};

if (typeof patchable.Response === "undefined") {
  patchable.Response = Response;
  patchable.Request = Request;
  patchable.Headers = Headers;
  patchable.fetch = fetch;
}

export {};
