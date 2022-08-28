import {
  test,
  expect,
  describe
} from "bun:test";
import {FetchHandler} from "../../../src";
import {createContext} from "../utils";

describe("FetchHandler", () => {
  test("status", () => {
    const handler = new FetchHandler();
    expect(handler.status).toBe(404);
  });

  test("message", () => {
    const handler = new FetchHandler();
    expect(typeof handler.message).toBe("string");
  });

  test("handle", async () => {
    const handler1 = new FetchHandler();
    const response1 = await handler1.handle(createContext());
    expect(response1.status).toBe(404);
    expect(typeof await response1.text()).toBe("string");

    const handler2 = new FetchHandler({status: 405, message: "message"});
    const response2 = await handler2.handle(createContext());
    expect(response2.status).toBe(405);
    expect(await response2.text()).toBe("message");
  });
});