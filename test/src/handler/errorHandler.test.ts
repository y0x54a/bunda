import {
  test,
  expect,
  describe
} from "bun:test";
import {
  Errinfo,
  ErrorHandler
} from "../../../src";

describe("ErrorHandler", () => {
  test("status", () => {
    const handler = new ErrorHandler({fallback: () => {}});
    expect(handler.status).toBe(500);
  });

  test("message", () => {
    const handler = new ErrorHandler({fallback: () => {}});
    expect(typeof handler.message).toBe("string");
  });

  test("handle", async () => {
    const handler1 = new ErrorHandler({fallback: () => {}});
    const response1 = await handler1.handle(Errinfo.error(new Error()));
    expect(response1.status).toBe(500);
    expect(typeof await response1.text()).toBe("string");

    let fallback = null;
    const error = new Error();
    const handler2 = new ErrorHandler({status: 501, message: "message", fallback: e => (fallback = e)});
    const response2 = await handler2.handle(Errinfo.error(error));
    expect(response2.status).toBe(501);
    expect(await response2.text()).toBe("message");
    expect(fallback).toBe(error);
  });
});