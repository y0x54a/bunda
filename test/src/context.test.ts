import {
  test,
  expect,
  describe
} from "bun:test";
import {
  defaultUrl,
  createContext,
  createUrl
} from "./utils";

describe("Context", () => {
  test("container", () => {
    const context = createContext();
    expect(!!context.container).toBe(true);
  });

  test("request", () => {
    const context = createContext();
    expect(!!context.request).toBe(true);
    expect(context.request.url).toBe(defaultUrl);
  });

  test("state", () => {
    const context = createContext();
    expect(!!context.state).toBe(true);
    expect(JSON.stringify(context.state)).toBe(JSON.stringify({}));
  });

  test("url", () => {
    const context = createContext();
    const url = context.url;
    expect(context.url).toBe(url);
    expect(context.url.href).toBe(defaultUrl);
  });

  test("method", () => {
    const context = createContext(defaultUrl, {method: "get"});
    expect(context.method).toBe("GET");
  });

  test("headers", () => {
    const context = createContext(defaultUrl, {headers: {foo: "bar"}});
    expect(context.headers.get("foo")).toBe("bar");
  });

  test("path", () => {
    const url = createUrl();
    const context = createContext();
    expect(context.path).toBe(url.path);
    context.url.path = "/foo/bar?query=value";
    expect(context.path).toBe("/foo/bar?query=value");
  });

  test("pathname", () => {
    const url = createUrl();
    const context = createContext();
    expect(context.pathname).toBe(url.pathname);
    context.url.pathname = "/foo/bar";
    expect(context.pathname).toBe("/foo/bar");
  });

  test("search", () => {
    const url = createUrl();
    const context = createContext();
    expect(context.search).toBe(url.search);
    context.url.search = "?foo=bar";
    expect(context.search).toBe("?foo=bar");
  });

  test("searchParams", () => {
    const url = createUrl();
    const context = createContext();
    expect(JSON.stringify([...context.searchParams.values()])).toBe(JSON.stringify([...url.searchParams.values()]));
    context.url.search = "?foo=bar";
    expect(JSON.stringify([...context.searchParams.values()])).toBe(JSON.stringify(["bar"]));
  });

  test("query", () => {
    const url = createUrl();
    const context = createContext();
    expect(context.query).toBe(url.query);
    context.url.query = "foo=bar";
    expect(context.query).toBe("foo=bar");
  });

  test("queryParams", () => {
    const url = createUrl();
    const context = createContext();
    expect(JSON.stringify(context.queryParams)).toBe(JSON.stringify(url.queryParams));
    context.url.query = "foo=bar";
    expect(JSON.stringify(context.queryParams)).toBe(JSON.stringify({foo: "bar"}));
  });

  test("redirect", async () => {
    const url = createUrl();
    const context = createContext();
    const response = await context.redirect(url.href, undefined, {foo: "bar"}, {status: 404});
    expect(response.ok).toBe(false);
    expect(response.status).toBe(302);
    expect(response.headers.get("foo")).toBe("bar");
  });

  test("response", async () => {
    const context = createContext();
    const response = await context.response("foo", undefined, {foo: "bar"}, {status: 404});
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("foo");
    expect(response.headers.get("foo")).toBe("bar");
  });

  test("json", async () => {
    const context = createContext();
    const response = await context.json({foo: "bar"}, undefined, {foo: "bar"}, {status: 404});
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe(JSON.stringify({foo: "bar"}));
    expect(response.headers.get("foo")).toBe("bar");
  });

  test("text", async () => {
    const context = createContext();
    const response = await context.text("foo", undefined, {foo: "bar"}, {status: 404});
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("foo");
    expect(response.headers.get("foo")).toBe("bar");
    expect(response.headers.get("content-type")).toBe("text/plain; charset=utf-8");
  });

  test("html", async () => {
    const context = createContext();
    const response = await context.html("foo", undefined, {foo: "bar"}, {status: 404});
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("foo");
    expect(response.headers.get("foo")).toBe("bar");
    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8");
  });
});