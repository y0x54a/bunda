import {
  ResponseType,
  RouteHandleType,
  RouterHandleType, 
  ContextInterface,
  RouterHandlerInterface
} from "../types";

class StackRouter implements RouterHandlerInterface
{
  protected _factories: RouterHandleType[] = [];

  constructor(factories?: RouterHandleType[]){
    if (factories) this.uses(factories);
  }

  get length(): number{
    return this._factories.length;
  }

  get factories(): RouterHandleType[]{
    return this._factories;
  }

  use(factory: RouterHandleType): this{
    this._factories.push(factory);
    return this;
  }

  uses(factories: RouterHandleType[]): this{
    factories.forEach(factory => this.use(factory));
    return this;
  }

  unuse(factory: RouterHandleType): this{
    const index = this._factories.indexOf(factory);
    if (index > -1) this._factories.splice(index, 1);
    return this;
  }

  unuses(factories: RouterHandleType[]): this{
    factories.forEach(factory => this.unuse(factory));
    return this;
  }

  handle(context: ContextInterface, next: RouteHandleType, start: number = 0): ResponseType{
    try {
      let isCalled = false;
      return start >= this._factories.length ? next(context) : this._factories[start](context, context => (
        isCalled ? Promise.reject(new Error("next() called multiple times.")) : (isCalled = true, this.handle(context, next, start + 1))
      ));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default StackRouter;