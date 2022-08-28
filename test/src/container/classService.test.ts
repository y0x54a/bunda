import {
  test,
  expect,
  describe
} from "bun:test";
import {ClassService} from "../../../src";

describe("ClassService", () => {
  test("value", () => {
    const Class = class {};
    const service = new ClassService(Class);
    expect(service.value).toBe(Class);
    expect(service.exports).toBe(undefined);
    expect(service.isResolved).toBe(false);
  });

  test("resolve", () => {
    const Class = class {};
    const service = new ClassService(Class);
    const result = service.resolve();
    expect(result instanceof Class).toBe(true);
    expect(service.exports).toBe(result);
    expect(service.isResolved).toBe(true);
    expect(service.resolve()).toBe(result);
    expect(service.create() !== result).toBe(true);
  });

  test("create", () => {
    const Class = class {};
    const service = new ClassService(Class);
    const result = service.create();
    expect(result instanceof Class).toBe(true);
    expect(service.exports).toBe(undefined);
    expect(service.isResolved).toBe(false);
    expect(service.create() !== result).toBe(true);
  });
});