import {
  test,
  expect,
  describe
} from "bun:test";
import {
  ContextInterface,
  PathnameRouter,
  PathnameRoute
} from "../../../src";
import {httpMethods} from "../utils";

describe("PathnameRouter", () => {
  test("path", () => {
    const path = "/foo";
    const router = new PathnameRouter({path, routes: [], middleware: []});
    expect(router.path).toBe(path);
  });

  test("routes", () => {
    const route = new PathnameRoute({path: "/foo", methods: ["get"], factory: () => null});
    const router = new PathnameRouter({routes: [route]});
    expect(router.routes[0]).toBe(route);
  });

  test("routes", () => {
    const handle = () => null;
    const router = new PathnameRouter({middleware: [handle]});
    expect(router.middleware.factories[0]).toBe(handle);
  });

  test("use", () => {
    const handle = () => null;
    const router = new PathnameRouter();
    router.use(handle);
    expect(router.middleware.factories[0]).toBe(handle);
  });

  test("uses", () => {
    const handle = () => null;
    const router = new PathnameRouter();
    router.uses([handle]);
    expect(router.middleware.factories[0]).toBe(handle);
  });

  test("unuse", () => {
    const handle = () => null;
    const router = new PathnameRouter({middleware: [handle]});
    expect(router.middleware.length).toBe(1);
    router.unuse(handle);
    expect(router.middleware.length).toBe(0);
  });

  test("unuses", () => {
    const handle = () => null;
    const router = new PathnameRouter({middleware: [handle]});
    expect(router.middleware.length).toBe(1);
    router.unuses([handle]);
    expect(router.middleware.length).toBe(0);
  });

  test("register", () => {
    const route = {path: "/", methods: ["get"], factory: () => null};
    const router = new PathnameRouter();
    router.register(route);
    router.register(new PathnameRoute(route));
    expect(router.routes.length).toBe(1);
  });

  test("registers", () => {
    const route = {path: "/", methods: ["get"], factory: () => null};
    const router = new PathnameRouter();
    router.registers([route]);
    router.registers([new PathnameRoute(route)]);
    expect(router.routes.length).toBe(1);
  });

  test("unregister", () => {
    const route = {path: "/", methods: ["get"], factory: () => null};
    const router = new PathnameRouter({routes: [route]});
    expect(router.routes.length).toBe(1);
    router.unregister(new PathnameRoute(route));
    expect(router.routes.length).toBe(0);
  });

  test("unregisters", () => {
    const route = {path: "/", methods: ["get"], factory: () => null};
    const router = new PathnameRouter({routes: [route]});
    expect(router.routes.length).toBe(1);
    router.unregisters([route]);
    expect(router.routes.length).toBe(0);
  });

  test("HTTP method[*]", () => {
    const router = new PathnameRouter();
    httpMethods.forEach(method => {
      const route = {path: '/', methods: [method], factory: () => null, middleware: []}
      router[method](route.path, route.factory, route.middleware);
      expect(router.routes[0].path).toBe(route.path);
      expect(router.routes[0].methods[0]).toBe(route.methods[0].toUpperCase());
      expect(router.routes[0].factory).toBe(route.factory);
      router.unregister(route);
    });
  });

  test("handle", async() => {
    let isValid = false;
    const context = {pathname: '/', method: 'GET'} as ContextInterface;
    const router = new PathnameRouter();
    httpMethods.forEach((method) => {
      isValid = false;
      const pathname = `/${method}`;
      const context = {pathname, method: method.toUpperCase()} as ContextInterface;
      const factory = () => (isValid = true, null);
      const route = {path: pathname, methods: [method], factory}
      router[method](route.path, route.factory);
      router.handle(context, () => null);
      expect(isValid).toBe(true);
      router.unregister(route);
    });

    isValid = false;
    router.handle(context, () => (isValid = true, null));
    expect(isValid).toBe(true);

    isValid = false;
    router.get('/', () => {throw new Error();});
    try {
      await router.handle(context, () => null);
    } catch (e) {
      isValid = true;
    }
    expect(isValid).toBe(true);
  });
});