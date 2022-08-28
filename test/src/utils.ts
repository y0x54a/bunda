import {
  Url,
  Context,
  Container
} from "../../src";

export const defaultUrl = "http://user:pass@0.0.0.0:3000/path/to?query=value#fragment";
export const httpMethods = ['get', 'head', 'post', 'put', 'delete', 'connect', 'options', 'trace', 'patch'];

export function createContext(url?: string, options: RequestInit = {}): Context{
  return new Context({
    container: new Container(),
    request: new Request(url || defaultUrl, options)
  });
}

export function createUrl(url?: string): Url{
  return new Url(url || defaultUrl);
}