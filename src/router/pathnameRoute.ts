import {
  ResponseType,
  RouteHandleType,
  RouterHandleType,
  ContextInterface,
  RouteHandlerInterface
} from "../types";
import StackRouter from "./stackRouter";

export type PathnameRouteOptionsType = {
  path: string,
  methods: string[],
  factory: RouteHandleType,
  middleware?: RouterHandleType[]
}

class PathnameRoute implements RouteHandlerInterface
{
  protected _path: string;
  protected _methods: string[];
  protected _factory: RouteHandleType;
  protected _middleware: StackRouter;

  constructor({path, methods, factory, middleware}: PathnameRouteOptionsType){
    this._path = path;
    this._methods = methods;
    this._factory = factory;
    this._middleware = new StackRouter(middleware);
  }

  get path(): string{
    return this._path;
  }

  get methods(): string[]{
    return this._methods;
  }

  get factory(): RouteHandleType{
    return this._factory;
  }

  get middleware(): StackRouter{
    return this._middleware;
  }

  use(factory: RouterHandleType): this{
    this._middleware.use(factory);
    return this;
  }

  uses(factories: RouterHandleType[]): this{
    this._middleware.uses(factories);
    return this;
  }

  unuse(factory: RouterHandleType): this{
    this._middleware.unuse(factory);
    return this;
  }

  unuses(factories: RouterHandleType[]): this{
    this._middleware.unuses(factories);
    return this;
  }

  handle(context: ContextInterface): ResponseType{
    return this._middleware.handle(context, this._factory);
  }
}

export default PathnameRoute;