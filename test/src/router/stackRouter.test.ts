import {
  test,
  expect,
  describe
} from "bun:test";
import {
  ContextInterface,
  RouteHandleType,
  Context,
  StackRouter
} from "../../../src";
import {createContext} from "../utils";

describe("StackRouter", () => {
  test("length", () => {
    const router = new StackRouter([() => null]);
    expect(router.length).toBe(1);
  });

  test("factories", () => {
    const handle = () => null;
    const router = new StackRouter([handle]);
    expect(router.factories[0]).toBe(handle);
  });

  test("use", () => {
    const handle = () => null;
    const router = new StackRouter();
    router.use(handle);
    expect(router.factories[0]).toBe(handle);
  });

  test("uses", () => {
    const handle = () => null;
    const router = new StackRouter();
    router.uses([handle]);
    expect(router.factories[0]).toBe(handle);
  });

  test("unuse", () => {
    const handle = () => null;
    const router = new StackRouter([handle]);
    expect(router.length).toBe(1);
    router.unuse(handle);
    expect(router.length).toBe(0);
  });

  test("unuses", () => {
    const handle = () => null;
    const router = new StackRouter([handle]);
    expect(router.length).toBe(1);
    router.unuses([handle]);
    expect(router.length).toBe(0);
  });

  test("handle", async () => {
    const context = createContext();
    const handleThrow = () => {throw new Error();};
    const handleReject = () => Promise.reject(new Error());
    const handleMultiCalled = (ctx: ContextInterface, next: RouteHandleType) => (next(ctx), next(ctx));

    const router1 = new StackRouter();
    router1.use(async (ctx: Context, next) => ctx.text(
      await (await next(ctx)).text() + "-baz"
    ));
    router1.use(async (ctx: Context, next) => ctx.text(
      await (await next(ctx)).text() + "-bar"
    ));
    const result1 = await (await router1.handle(context, (ctx: Context) => ctx.text("foo"))).text();
    const result2 = await (await router1.handle(context, (ctx: Context) => ctx.text("foo"), 1)).text();
    const result3 = await (await router1.handle(context, (ctx: Context) => ctx.text("foo"), 2)).text();
    expect(result1).toBe("foo-bar-baz");
    expect(result2).toBe("foo-bar");
    expect(result3).toBe("foo");

    let isValid = false;
    const
     router2 = new StackRouter([handleThrow]);
    try {
      await router2.handle(context, () => null);
    } catch(e) {
      isValid = true;
    }
    expect(isValid).toBe(true);

    isValid = false;
    const router3 = new StackRouter([handleReject]);
    try {
      await router3.handle(context, () => null);
    } catch(e) {
      isValid = true;
    }
    expect(isValid).toBe(true);

    isValid = false;
    const router4 = new StackRouter();
    try {
      await router4.handle(context, handleThrow);
    } catch(e) {
      isValid = true;
    }
    expect(isValid).toBe(true);

    isValid = false;
    const router5 = new StackRouter();
    try {
      await router5.handle(context, handleReject);
    } catch(e) {
      isValid = true;
    }
    expect(isValid).toBe(true);

    isValid = false;
    const router6 = new StackRouter([handleMultiCalled]);
    try {
      await router6.handle(context, () => null);
      isValid = false;
    } catch(e) {
      isValid = true;
    }
    expect(isValid).toBe(true);
  });
});