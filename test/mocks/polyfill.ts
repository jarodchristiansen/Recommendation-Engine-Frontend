/**
 * Polyfill fetch/Response for MSW in Jest (jsdom does not provide these).
 * Must be imported before any msw/node code.
 */
if (typeof (globalThis as any).Response === "undefined") {
  const undici = require("undici");
  (globalThis as any).Response = undici.Response;
  (globalThis as any).Request = undici.Request;
  (globalThis as any).Headers = undici.Headers;
  (globalThis as any).fetch = undici.fetch;
}

export {};
