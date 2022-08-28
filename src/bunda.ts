import {
  serve,
  Server,
  Errorlike
} from "bun";
import {
  ObjType,
  FuncType,
  ServeType,
  ResponseType,
  ApplicationInterface,
  ContextInterface,
  ErrorHandlerInterface,
  RouteHandlerInterface,
  RouterHandlerInterface
} from "./types";
import Errinfo from "./errinfo";
import Context from "./context";
import Container from "./container/container";
import Service from "./container/service";
import FetchHandler from "./handler/fetchHandler";
import ErrorHandler from "./handler/errorHandler";
import PathnameRouter from "./router/pathnameRouter";

export type BundaOptionsType = ServeType & {
  services?: ObjType<Service>
}

class Bunda extends Container implements ApplicationInterface
{
  protected _server: Server;
  protected _options: ServeType;

  constructor({services, ...options}: BundaOptionsType = {}){
    super(services);
    this._options = {
      port: 3000,
      hostname: "0.0.0.0",
      development: process.env.NODE_ENV !== "production",
      ...options
    };
    this.classIf("router", PathnameRouter);
    this.classIf("fetchHandler", FetchHandler);
    this.classIf("errorHandler", ErrorHandler);
  }

  get router(): any{
    return this.resolve<RouterHandlerInterface>("router");
  }

  get fetchHandler(): any{
    return this.resolve<RouteHandlerInterface>("fetchHandler");
  }

  get errorHandler(): any{
    return this.resolve<ErrorHandlerInterface>("errorHandler");
  }

  get isServed(): boolean{
    return !!this._server;
  }

  get isDevelopment(): boolean{
    return !!this._options.development;
  }

  serve(): Promise<this>{
    if (this._server) return Promise.reject(new Error("The application has already served."));
    return new Promise((resolve, reject) => {
      const fetch = this._fetchFunc();
      const error = this._errorFunc();
      try {
        this._server = serve({...this._options, fetch, error});
      } catch (e) {
        reject(e);
        return;
      }
      resolve(this);
    });
  }

  stop(): Promise<this>{
    if (!this._server) return Promise.reject(new Error("The application has already stopped."));
    return new Promise((resolve, reject) => {
      try {
        this._server.stop();
      } catch (e) {
        reject(e);
        return;
      }
      delete this._server;
      resolve(this);
    });
  }

  protected _fetchFunc(): FuncType<ResponseType>{
    const {router, fetchHandler, errorHandler} = this;
    const fetchHandle = (context: ContextInterface) => fetchHandler.handle(context);
    const errorHandle = (context: ContextInterface, error: Error) => errorHandler.handle(Errinfo.fetch(error, context));
    return async (request: Request): ResponseType => {
      const context = new Context({container: this, request});
      return router.handle(context, fetchHandle).catch((error: Error) => errorHandle(context, error));
    };
  }

  protected _errorFunc(): FuncType<ResponseType>{
    const {errorHandler} = this;
    return (error: Errorlike): ResponseType => errorHandler.handle(Errinfo.error(error));
  }

  static create<T extends typeof Bunda>(this: T, options?: BundaOptionsType): InstanceType<T>{
    return new this(options) as InstanceType<T>;
  }

  static serve<T extends typeof Bunda>(this: T, options?: BundaOptionsType): Promise<InstanceType<T>>{
    return this.create(options).serve();
  }
}

export default Bunda;