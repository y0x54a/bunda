import {
  test,
  expect,
  describe
} from "bun:test";
import {
  Bunda,
  Context,
  FetchHandler,
  ErrorHandler,
  PathnameRouter
} from "../../src";

let port = 3000;

describe("Bunda", () => {
  test("router", () => {
    const bunda1 = new Bunda();
    expect(bunda1.has("router")).toBe(true);
    expect(bunda1.router instanceof PathnameRouter).toBe(true);
  });

  test("fetchHandler", () => {
    const bunda = new Bunda();
    expect(bunda.has("fetchHandler")).toBe(true);
    expect(bunda.fetchHandler instanceof FetchHandler).toBe(true);
  });

  test("errorHandler", () => {
    const bunda = new Bunda();
    expect(bunda.has("errorHandler")).toBe(true);
    expect(bunda.errorHandler instanceof ErrorHandler).toBe(true);
  });

  test("isServed", () => {
    const bunda = new Bunda();
    expect(bunda.isServed).toBe(false);
  });

  test("isDevelopment", () => {
    const bunda = new Bunda();
    expect(bunda.isDevelopment).toBe(process.env.NODE_ENV !== "production");
  });

  test("serve", async () => {
    const bunda = Bunda.create({port: port++});
    expect(await bunda.serve()).toBe(bunda);
    expect(bunda.isServed).toBe(true);
    expect(await bunda.stop()).toBe(bunda);
    expect(bunda.isServed).toBe(false);
    let isValid = false;
    await bunda.serve();
    try {
      await bunda.serve();
    } catch (e) {
      isValid = true;
    }
    await bunda.stop();
    expect(isValid).toBe(true);
  });

  test("stop", async () => {
    const bunda = await Bunda.serve({port: port++});
    expect(bunda.isServed).toBe(true);
    expect(await bunda.stop()).toBe(bunda);
    expect(bunda.isServed).toBe(false);
    let isValid = false;
    try {
      await bunda.stop();
    } catch (e) {
      isValid = true;
    }
    expect(isValid).toBe(true);
  });

  test("fetch", async () => {
    let isPing = false;
    let isError = false;
    const sPort = port++;
    const bunda = await Bunda.serve({
      port: sPort,
      services: {
        errorHandler: Bunda.rawService(new ErrorHandler({
          fallback: () => (isError = true)
        }))
      }
    });
    bunda.router.get("/ping", (ctx: Context) => (isPing = true, ctx.text("Pong!")));
    bunda.router.get("/error", () => Promise.reject(new Error()));
    await fetch(`http://localhost:${sPort}/ping`);
    await fetch(`http://localhost:${sPort}/error`);
    await bunda.stop();
    expect(isPing).toBe(true);
    expect(isError).toBe(true);
  });
});