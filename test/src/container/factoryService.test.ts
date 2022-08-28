import {
  test,
  expect,
  describe
} from "bun:test";
import {FactoryService} from "../../../src";

describe("FactoryService", () => {
  test("value", () => {
    const value = () => 0;
    const service = new FactoryService(value);
    expect(service.value).toBe(value);
    expect(service.exports).toBe(undefined);
    expect(service.isResolved).toBe(false);
  });

  test("resolve", () => {
    let i = 0;
    const value = () => ++i;
    const service = new FactoryService(value);
    const result = service.resolve();
    expect(result).toBe(1);
    expect(service.exports).toBe(result);
    expect(service.isResolved).toBe(true);
    expect(service.resolve()).toBe(result);
    expect(service.create() !== result).toBe(true);
  });

  test("create", () => {
    let i = 0;
    const value = () => ++i;
    const service = new FactoryService(value);
    const result = service.create();
    expect(result).toBe(1);
    expect(service.exports).toBe(undefined);
    expect(service.isResolved).toBe(false);
    expect(service.create() !== result).toBe(true);
  });
});