import {
  Errorlike,
  ServeOptions,
  SSLServeOptions
} from "bun";

export type ObjType<V = any> = {
  [key: string | symbol]: V;
}

export type FuncType<R = any, A = any> = {
  (...args: A[]): R;
}

export type ClassType<R = any, A = any> = {
  new (...args: A[]): R;
}

export type ServeType = Omit<ServeOptions, "fetch" | "error"> | Omit<SSLServeOptions, "fetch" | "error">

export type ServeErrorType = Error | Errorlike

export type ResponseType = Promise<Response>

export type ResponseBodyType = BlobPart | BlobPart[]

export interface UrlInterface
{
  scheme: string;
  protocol: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  path: string;
  pathname: string;
  search: string;
  readonly searchParams: URLSearchParams;
  query: string;
  readonly queryParams: ObjType;
  hash: string;
  fragment: string;
  readonly origin: string;
  readonly href: string;
}

export interface ErrinfoInterface
{
  readonly code: string;
  readonly error: ServeErrorType;
  readonly context?: ContextInterface;
}

export interface ApplicationInterface
{
  readonly isServed: boolean;
  readonly isDevelopment: boolean;
  serve(): Promise<ApplicationInterface>;
  stop(): Promise<ApplicationInterface>;
}

export interface ContainerInterface
{
  has(name: string): boolean;
  resolve<R, A>(name: string, args?: A[]): R;
  resolveIf<R, A>(name: string, args?: A[], retval?: R): R;
  create<R, A>(name: string, args?: A[]): R;
  createIf<R, A>(name: string, args?: A[], retval?: R): R;
}

export interface ContextInterface
{
  readonly container: ContainerInterface;
  readonly request: Request;
  readonly state: ObjType;
  readonly url: UrlInterface;
  readonly method: string;
  readonly headers: Headers;
  readonly path: string;
  readonly pathname: string;
  readonly search: string;
  readonly searchParams: URLSearchParams;
  readonly query: string;
  readonly queryParams: ObjType;
  redirect(url: string, status?: number, headers?: HeadersInit, options?: ResponseInit): ResponseType;
  response(body: ResponseBodyType, status?: number, headers?: HeadersInit, options?: ResponseInit): ResponseType;
}

export type ErrorHandleType = {
  (errinfo: ErrinfoInterface): ResponseType;
}

export type RouteHandleType = {
  (context: ContextInterface): ResponseType;
}

export type RouterHandleType = {
  (context: ContextInterface, next: RouteHandleType): ResponseType;
}

export interface ErrorHandlerInterface
{
  handle: ErrorHandleType;
}

export interface RouteHandlerInterface
{
  handle: RouteHandleType;
}

export interface RouterHandlerInterface
{
  handle: RouterHandleType;
}