import {
  ObjType,
  UrlInterface
} from "./types";

class Url extends URL implements UrlInterface
{
  get scheme(): string{
    return this.protocol.replace(/\:$/, "");
  }

  set scheme(value: string){
    this.protocol = value !== "" ? value + ":" : "";
  }

  get path(): string{
    return this.pathname + this.search;
  }

  set path(value: string){
    value = String(value);
    const index = value.indexOf('?');
    const [pathname, query] = index > -1 ? [value.substring(0, index), value.substring(index + 1)] : [value, ""];
    this.pathname = pathname;
    this.query = query;
  }

  get query(): string{
    return this.search.replace(/^\?/, "");
  }

  set query(value: string){
    this.search = value !== "" ? "?" + value : "";
  }

  get queryParams(): ObjType{
    const queryParams = {};
    this.searchParams.forEach((value, key) => queryParams[key] = value);
    return queryParams;
  }

  get fragment(): string{
    return this.hash.replace(/^\#/, "");
  }

  set fragment(value: string){
    this.hash = value !== "" ? "#" + value : "";
  }
}

export default Url;