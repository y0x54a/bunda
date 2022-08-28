import {
  ObjType,
  FuncType,
  ClassType,
  ContainerInterface
} from "../types";
import Service from "./service";
import RawService from "./rawService";
import ClassService from "./classService";
import FactoryService from "./factoryService";

class Container implements ContainerInterface
{
  protected _services: ObjType<Service> = {};

  constructor(services?: ObjType<Service>){
    if (services) this.registers(services);
  }

  get names(): string[]{
    return Object.keys(this._services);
  }

  get services(): ObjType<Service>{
    return this._services;
  }

  has(name: string): boolean{
    return Object.hasOwn(this._services, name);
  }

  get(name: string): Service{
    if (!this.has(name)) throw new Error(`The service "${name}" not found.`);
    return this._services[name];
  }

  getIf(name: string): Service | null{
    return this.has(name) ? this._services[name] : null;
  }

  raw(name: string, value: any): this{
    return this.register(name, new RawService(value));
  }

  rawIf(name: string, value: any): this{
    return !this.has(name) ? this.raw(name, value) : this;
  }

  class(name: string, value: ClassType): this{
    return this.register(name, new ClassService(value));
  }

  classIf(name: string, value: ClassType): this{
    return !this.has(name) ? this.class(name, value) : this;
  }

  factory(name: string, value: FuncType): this{
    return this.register(name, new FactoryService(value));
  }

  factoryIf(name: string, value: FuncType): this{
    return !this.has(name) ? this.factory(name, value) : this;
  }

  register(name: string, service: Service): this{
    this._services[name] = service;
    return this; 
  }

  registers(services: ObjType<Service>): this{
    Object.keys(services).forEach(name => this.register(name, services[name]));
    return this;
  }

  registerIf(name: string, service: Service): this{
    return !this.has(name) ? this.register(name, service) : this;
  }

  registersIf(services: ObjType<Service>): this{
    Object.keys(services).forEach(name => this.registerIf(name, services[name]));
    return this;
  }

  unregister(name: string): this{
    if (!this.has(name)) throw new Error(`The service "${name}" not found.`);
    delete this._services[name];
    return this;
  }

  unregisters(names: string[]): this{
    names.forEach(name => this.unregister(name));
    return this;
  }

  unregisterIf(name: string): this{
    delete this._services[name];
    return this;
  }

  unregistersIf(names: string[]): this{
    names.forEach(name => this.unregisterIf(name));
    return this;
  }

  resolve<R = any, A = any>(name: string, args?: A[]): R{
    return this.get(name).resolve<R, A>(args);
  }

  resolveIf<R = any, A = any>(name: string, args?: A[], retval?: R): R{
    return this.has(name) ? this._services[name].resolve<R, A>(args) : retval;
  }

  create<R = any, A = any>(name: string, args?: A[]): R{
    return this.get(name).create<R, A>(args);
  }

  createIf<R = any, A = any>(name: string, args?: A[], retval?: R): R{
    return this.has(name) ? this._services[name].create<R, A>(args) : retval;
  }

  static rawService(value: any): RawService{
    return new RawService(value);
  }

  static classService(value: any): ClassService{
    return new ClassService(value);
  }

  static factoryService(value: any): FactoryService{
    return new FactoryService(value);
  }
}

export default Container;