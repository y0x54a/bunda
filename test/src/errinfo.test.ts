import {
  test,
  expect,
  describe
} from "bun:test";
import {
  Errinfo,
  ContextInterface
} from "../../src";

describe("Errinfo", () => {
  test("fetch", () => {
    const error = new Error();
    const context = {} as ContextInterface;
    const errinfo = Errinfo.fetch(error, context);
    expect(errinfo.code).toBe(Errinfo.FETCH);
    expect(errinfo.error).toBe(error);
    expect(errinfo.context).toBe(context);
  });

  test("error", () => {
    const error = new Error();
    const errinfo = Errinfo.error(error);
    expect(errinfo.code).toBe(Errinfo.ERROR);
    expect(errinfo.error).toBe(error);
    expect(errinfo.context).toBe(undefined);
  });
});