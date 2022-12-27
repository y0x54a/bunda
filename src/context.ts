import {
  ObjType,
  ResponseType,
  ResponseBodyType,
  UrlInterface,
  ContainerInterface,
  ContextInterface
} from "./types";
import Url from "./url";

export type ContextOptionsType = {
  container: ContainerInterface;
  request: Request;
  state?: ObjType;
}

class Context implements ContextInterface
{
  readonly container: ContainerInterface;
  readonly request: Request;
  readonly state: ObjType;

  constructor({container, request, state = {}}: ContextOptionsType){
    this.container = container;
    this.request = request;
    this.state = state;
  }

  #url: UrlInterface;
  get url(): UrlInterface{
    return this.#url ||= new Url(this.request.url);
  }

  get method(): string{
    return this.request.method;
  }

  get headers(): Headers{
    return this.request.headers;
  }

  get path(): string{
    return this.url.path;
  }

  get pathname(): string{
    return this.url.pathname;
  }

  get search(): string{
    return this.url.search;
  }

  get searchParams(): URLSearchParams{
    return this.url.searchParams;
  }

  get query(): string{
    return this.url.query;
  }

  get queryParams(): ObjType{
    return this.url.queryParams;
  }

  redirect(url: string, status: number = 302, headers?: HeadersInit, options?: ResponseInit): ResponseType{
    return Promise.resolve(Response.redirect(url, {...options, status, headers}));
  }

  response(body: ResponseBodyType, status: number = 200, headers?: HeadersInit, options?: ResponseInit): ResponseType{
    return Promise.resolve(new Response(body, {...options, status, headers}));
  }

  json(json: any, status: number = 200, headers?: HeadersInit, options?: ResponseInit): ResponseType{
    return Promise.resolve(Response.json(json, {...options, status, headers}));
  }

  text(text: string, status?: number, headers?: HeadersInit, options?: ResponseInit): ResponseType{
    headers = new Headers(headers);
    headers.set("Content-Type", "text/plain; charset=utf-8");
    return this.response(text, status, headers, options);
  }

  html(html: string, status?: number, headers?: HeadersInit, options?: ResponseInit): ResponseType{
    headers = new Headers(headers);
    headers.set("Content-Type", "text/html; charset=utf-8");
    return this.response(html, status, headers, options);
  }
}

export default Context;