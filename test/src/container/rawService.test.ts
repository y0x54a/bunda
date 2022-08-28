import {
  test,
  expect,
  describe
} from "bun:test";
import {RawService} from "../../../src";

describe("RawService", () => {
  test("value", () => {
    const value = "foo";
    const service = new RawService(value);
    expect(service.value).toBe(value);
    expect(service.exports).toBe(undefined);
    expect(service.isResolved).toBe(false);
  });

  test("resolve", () => {
    const value = "foo";
    const service = new RawService(value);
    expect(service.resolve()).toBe(value);
    expect(service.exports).toBe(value);
    expect(service.isResolved).toBe(true);
    expect(service.resolve()).toBe(value);
  });

  test("create", () => {
    const value = "foo";
    const service = new RawService(value);
    expect(service.create()).toBe(value);
    expect(service.exports).toBe(undefined);
    expect(service.isResolved).toBe(false);
    expect(service.create()).toBe(value);
  });
});