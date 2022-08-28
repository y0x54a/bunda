import {
  test,
  expect,
  describe
} from "bun:test";
import {createUrl} from "./utils";

describe("Url", () => {
  test("scheme", () => {
    const url = createUrl();
    expect(url.scheme).toBe("http");

    url.scheme = "https";
    expect(url.scheme).toBe("https");
    expect(url.protocol).toBe("https:");

    url.protocol = "https:";
    expect(url.scheme).toBe("https");
    expect(url.protocol).toBe("https:");

    url.scheme = "";
    expect(url.scheme).toBe("https");
    expect(url.protocol).toBe("https:");
  });

  test("path", () => {
    const url = createUrl();
    expect(url.path).toBe("/path/to?query=value");

    url.path = "/foo/bar/baz?foo=bar";
    expect(url.path).toBe("/foo/bar/baz?foo=bar");
    expect(url.pathname).toBe("/foo/bar/baz");
    expect(url.query).toBe("foo=bar");
    expect(url.search).toBe("?foo=bar");

    url.pathname = "/path/to";
    expect(url.path).toBe("/path/to?foo=bar");
    expect(url.pathname).toBe("/path/to");
    expect(url.query).toBe("foo=bar");
    expect(url.search).toBe("?foo=bar");

    url.path = "";
    expect(url.path).toBe("/");
    expect(url.pathname).toBe("/");
    expect(url.query).toBe("");
    expect(url.search).toBe("");
  });

  test("query", () => {
    const url = createUrl();
    expect(url.query).toBe("query=value");

    url.query = "foo=bar";
    expect(url.query).toBe("foo=bar");
    expect(url.search).toBe("?foo=bar");

    url.search = "?foo=bar";
    expect(url.query).toBe("foo=bar");
    expect(url.search).toBe("?foo=bar");

    url.query = "";
    expect(url.query).toBe("");
    expect(url.search).toBe("");
  });

  test("queryParams", () => {
    const url = createUrl();
    expect(url.query).toBe("query=value");

    url.query = "foo=bar";
    expect(JSON.stringify(url.queryParams)).toBe(JSON.stringify({foo: "bar"}));
    expect(url.searchParams.get("foo")).toBe("bar");

    url.searchParams.append("key", "value");
    expect(JSON.stringify(url.queryParams)).toBe(JSON.stringify({foo: "bar", key: "value"}));
    expect(url.searchParams.get("key")).toBe("value");

    url.query = "";
    expect(JSON.stringify(url.queryParams)).toBe(JSON.stringify({}));
    expect([...url.searchParams.values()].length).toBe(0);
  });

  test("fragment", () => {
    const url = createUrl();
    expect(url.fragment).toBe("fragment");

    url.fragment = "foo";
    expect(url.fragment).toBe("foo");
    expect(url.hash).toBe("#foo");

    url.hash = "#foo";
    expect(url.fragment).toBe("foo");
    expect(url.hash).toBe("#foo");

    url.fragment = "";
    expect(url.fragment).toBe("");
    expect(url.hash).toBe("");
  });
});