import {
  ObjType,
  ResponseType,
  RouteHandleType,
  RouterHandleType,
  ContextInterface,
  RouterHandlerInterface
} from "../types";
import StackRouter from "./stackRouter";
import PathnameRoute, {PathnameRouteOptionsType} from "./pathnameRoute";

export type PathnameRouterOptionsType = {
  path?: string,
  routes?: (PathnameRoute | PathnameRouteOptionsType)[],
  middleware?: RouterHandleType[]
}

class PathnameRouter implements RouterHandlerInterface
{
  protected _path: string = '';
  protected _routes: ObjType<PathnameRoute> = {};
  protected _middleware: StackRouter = new StackRouter();

  constructor({path, routes, middleware}: PathnameRouterOptionsType = {}){
    if (path) this._path = path;
    if (routes) this.registers(routes);
    if (middleware) this.uses(middleware);
  }

  get path(): string{
    return this._path;
  }

  get routes(): PathnameRoute[]{
    return [...new Set(Object.values(this._routes))];
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

  get(path: string, factory: RouteHandleType, middleware?: RouterHandleType[]): PathnameRoute{
    return this.register({path, methods: ["GET"], factory, middleware});
  }

  head(path: string, factory: RouteHandleType, middleware?: RouterHandleType[]): PathnameRoute{
    return this.register({path, methods: ["HEAD"], factory, middleware});
  }

  post(path: string, factory: RouteHandleType, middleware?: RouterHandleType[]): PathnameRoute{
    return this.register({path, methods: ["POST"], factory, middleware});
  }

  put(path: string, factory: RouteHandleType, middleware?: RouterHandleType[]): PathnameRoute{
    return this.register({path, methods: ["PUT"], factory, middleware});
  }

  delete(path: string, factory: RouteHandleType, middleware?: RouterHandleType[]): PathnameRoute{
    return this.register({path, methods: ["DELETE"], factory, middleware});
  }

  connect(path: string, factory: RouteHandleType, middleware?: RouterHandleType[]): PathnameRoute{
    return this.register({path, methods: ["CONNECT"], factory, middleware});
  }

  options(path: string, factory: RouteHandleType, middleware?: RouterHandleType[]): PathnameRoute{
    return this.register({path, methods: ["OPTIONS"], factory, middleware});
  }

  trace(path: string, factory: RouteHandleType, middleware?: RouterHandleType[]): PathnameRoute{
    return this.register({path, methods: ["TRACE"], factory, middleware});
  }

  patch(path: string, factory: RouteHandleType, middleware?: RouterHandleType[]): PathnameRoute{
    return this.register({path, methods: ["PATCH"], factory, middleware});
  }

  register(route: PathnameRoute | PathnameRouteOptionsType): PathnameRoute{
    const path = this._path;
    if (!(route instanceof PathnameRoute)) route = new PathnameRoute(route as PathnameRouteOptionsType);
    route.methods.forEach(method => this._routes[method.toUpperCase() + ':' + path + route.path] = route as PathnameRoute);
    return route;
  }

  registers(routes: (PathnameRoute | PathnameRouteOptionsType)[]): PathnameRoute[]{
    return routes.map(route => this.register(route));
  }

  unregister(route: PathnameRoute | PathnameRouteOptionsType): this{
    const path = this._path;
    route.methods.forEach(method => delete this._routes[method.toUpperCase() + ':' + path + route.path]);
    return this;
  }

  unregisters(routes: (PathnameRoute | PathnameRouteOptionsType)[]): this{
    routes.forEach(route => this.unregister(route));
    return this;
  }

  handle(context: ContextInterface, next: RouteHandleType): ResponseType{
    try {
      const route = this._routes[context.method + ':' + this._path + context.pathname];
      return route ? this._middleware.handle(context, context => route.handle(context)) : next(context);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default PathnameRouter;