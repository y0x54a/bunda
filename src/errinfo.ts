import {
  ServeErrorType,
  ErrinfoInterface,
  ContextInterface
} from "./types";

class Errinfo implements ErrinfoInterface
{
  static readonly FETCH = "fetch";
  static readonly ERROR = "error";
  readonly code: string;
  readonly error: ServeErrorType;
  readonly context?: ContextInterface;

  constructor({code, error, context}: ErrinfoInterface){
    this.code = code;
    this.error = error;
    this.context = context;
  }

  static fetch<T extends typeof Errinfo>(this: T, error: ServeErrorType, context: ContextInterface): InstanceType<T>{
    return new this({code: this.FETCH, error, context}) as InstanceType<T>;
  }

  static error<T extends typeof Errinfo>(this: T, error: ServeErrorType): InstanceType<T>{
    return new this({code: this.ERROR, error}) as InstanceType<T>;
  }
}

export default Errinfo;