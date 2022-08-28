import {
  test,
  expect,
  describe
} from "bun:test";
import {Container} from "../../../src";

describe("Container", () => {
  test("names", () => {
    const service = Container.rawService(null);
    const container = new Container({name: service});
    expect(container.names[0]).toBe("name");
  });

  test("services", () => {
    const service = Container.rawService(null);
    const container = new Container({name: service});
    expect(container.services["name"]).toBe(service);
  });

  test("has", () => {
    const service = Container.rawService(null);
    const container = new Container({name: service});
    expect(container.has("name")).toBe(true);
  });

  test("get", () => {
    const service = Container.rawService(null);
    const container = new Container({name: service});
    expect(container.get("name")).toBe(service);
    try{
      container.get("unknown");
    } catch (e) {
      return;
    }
    expect(true).toBe(false);
  });

  test("getIf", () => {
    const service = Container.rawService(null);
    const container = new Container({name: service});
    expect(container.getIf("name")).toBe(service);
    expect(container.getIf("unknown")).toBe(null);
  });

  test("raw", () => {
    const container = new Container();
    container.raw("name", 1);
    expect(container.get("name").value).toBe(1);
    container.raw("name", 2);
    expect(container.get("name").value).toBe(2);
  });

  test("class", () => {
    const class1 = class {};
    const class2 = class {};
    const container = new Container();
    container.class("name", class1);
    expect(container.get("name").value).toBe(class1);
    container.class("name", class2);
    expect(container.get("name").value).toBe(class2);
  });

  test("classIf", () => {
    const class1 = class {};
    const class2 = class {};
    const container = new Container();
    container.classIf("name", class1);
    expect(container.get("name").value).toBe(class1);
    container.classIf("name", class2);
    expect(container.get("name").value).toBe(class1);
  });

  test("factory", () => {
    const factory1 = () => null;
    const factory2 = () => null;
    const container = new Container();
    container.factory("name", factory1);
    expect(container.get("name").value).toBe(factory1);
    container.factory("name", factory2);
    expect(container.get("name").value).toBe(factory2);
  });

  test("factoryIf", () => {
    const factory1 = () => null;
    const factory2 = () => null;
    const container = new Container();
    container.factoryIf("name", factory1);
    expect(container.get("name").value).toBe(factory1);
    container.factoryIf("name", factory2);
    expect(container.get("name").value).toBe(factory1);
  });

  test("register", () => {
    const service1 = Container.rawService(null);
    const service2 = Container.classService(class {});
    const container = new Container();
    container.register("name", service1);
    expect(container.get("name")).toBe(service1);
    container.register("name", service2);
    expect(container.get("name")).toBe(service2);
  });

  test("registers", () => {
    const service1 = Container.rawService(null);
    const service2 = Container.factoryService(() => {});
    const container = new Container();
    container.registers({name: service1});
    expect(container.get("name")).toBe(service1);
    container.registers({name: service2});
    expect(container.get("name")).toBe(service2);
  });

  test("registerIf", () => {
    const service1 = Container.rawService(null);
    const service2 = Container.classService(class {});
    const container = new Container();
    container.registerIf("name", service1);
    expect(container.get("name")).toBe(service1);
    container.registerIf("name", service2);
    expect(container.get("name")).toBe(service1);
  });

  test("registersIf", () => {
    const service1 = Container.rawService(null);
    const service2 = Container.factoryService(() => {});
    const container = new Container();
    container.registersIf({name: service1});
    expect(container.get("name")).toBe(service1);
    container.registersIf({name: service2});
    expect(container.get("name")).toBe(service1);
  });

  test("unregister", () => {
    const service = Container.rawService(null);
    const container = new Container({name: service});
    container.unregister("name");
    expect(container.has("name")).toBe(false);
    try{
      container.unregister("name");
    } catch (e) {
      return;
    }
    expect(true).toBe(false);
  });

  test("unregisters", () => {
    const service = Container.rawService(null);
    const container = new Container({name: service});
    container.unregisters(["name"]);
    expect(container.has("name")).toBe(false);
    try{
      container.unregisters(["unknown"]);
    } catch (e) {
      return;
    }
    expect(true).toBe(false);
  });

  test("unregisterIf", () => {
    const service = Container.rawService(null);
    const container = new Container({name: service});
    container.unregisterIf("name");
    expect(container.has("name")).toBe(false);
    container.unregisterIf("unknown");
  });

  test("unregistersIf", () => {
    const service = Container.rawService(null);
    const container = new Container({name: service});
    container.unregistersIf(["name"]);
    expect(container.has("name")).toBe(false);
    container.unregistersIf(["unknown"]);
  });

  test("resolve", () => {
    const container = new Container();
    container.raw("name", 1);
    expect(container.resolve("name")).toBe(1);
    try{
      container.resolve("unknown");
    } catch (e) {
      return;
    }
    expect(true).toBe(false);
  });

  test("resolveIf", () => {
    const container = new Container();
    container.raw("name", 1);
    expect(container.resolveIf("name")).toBe(1);
    expect(container.resolveIf("unknown", [], null)).toBe(null);
  });

  test("create", () => {
    const container = new Container();
    container.raw("name", 1);
    expect(container.create("name")).toBe(1);
    try{
      container.create("unknown");
    } catch (e) {
      return;
    }
    expect(true).toBe(false);
  });

  test("createIf", () => {
    const container = new Container();
    container.raw("name", 1);
    expect(container.createIf("name")).toBe(1);
    expect(container.createIf("unknown", [], null)).toBe(null);
  });
});