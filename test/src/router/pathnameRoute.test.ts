import {
  test,
  expect,
  describe
} from "bun:test";
import {
  ContextInterface,
  RouteHandleType,
  PathnameRoute
} from "../../../src";
import {createContext} from "../utils";

describe("PathnameRoute", () => {
  test("path", () => {
    const path = "/foo";
    const route = new PathnameRoute({path, methods: [], factory: () => null, middleware: []});
    expect(route.path).toBe(path);
  });

  test("methods", () => {
    const methods = ["post"];
    const route = new PathnameRoute({path: "", methods, factory: () => null, middleware: []});
    expect(route.methods).toBe(methods);
  });

  test("factory", () => {
    const factory = () => null;
    const route = new PathnameRoute({path: "", methods: [], factory, middleware: []});
    expect(route.factory).toBe(factory);
  });

  test("middleware", () => {
    const handle = () => null;
    const route = new PathnameRoute({path: "", methods: [], factory: () => null, middleware: [handle]});
    expect(route.middleware.factories[0]).toBe(handle);
  });

  test("use", () => {
    const handle = () => null;
    const route = new PathnameRoute({path: "", methods: [], factory: () => null, middleware: []});
    route.use(handle);
    expect(route.middleware.factories[0]).toBe(handle);
  });

  test("uses", () => {
    const handle = () => null;
    const route = new PathnameRoute({path: "", methods: [], factory: () => null, middleware: []});
    route.uses([handle]);
    expect(route.middleware.factories[0]).toBe(handle);
  });

  test("unuse", () => {
    const handle = () => null;
    const route = new PathnameRoute({path: "", methods: [], factory: () => null, middleware: [handle]});
    expect(route.middleware.factories[0]).toBe(handle);
    route.unuse(handle);
    expect(route.middleware.length).toBe(0);
  });

  test("unuses", () => {
    const handle = () => null;
    const route = new PathnameRoute({path: "", methods: [], factory: () => null, middleware: [handle]});
    expect(route.middleware.factories[0]).toBe(handle);
    route.unuses([handle]);
    expect(route.middleware.length).toBe(0);
  });

  test("handle", () => {
    const context = createContext();
    const handle = (ctx: ContextInterface, next: RouteHandleType) => next(ctx);
    const route = new PathnameRoute({path: "", methods: [], factory: () => null, middleware: [handle]});
    expect(route.handle(context)).toBe(null);
  });
});