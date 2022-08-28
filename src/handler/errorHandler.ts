import {
  FuncType,
  ServeErrorType,
  ResponseType,
  ErrinfoInterface,
  ErrorHandlerInterface
} from "../types";

export type ErrorHandlerOptionsType = {
  status?: number;
  message?: string;
  fallback?: FuncType<any, ServeErrorType>;
}

class ErrorHandler implements ErrorHandlerInterface
{
  readonly status: number;
  readonly message: string;
  readonly fallback: FuncType;

  constructor({status = 500, message = "500 / Internal Server Error", fallback = console.error}: ErrorHandlerOptionsType = {}) {
    this.status = status;
    this.message = message;
    this.fallback = fallback;
  }

  handle({error}: ErrinfoInterface): ResponseType{
    this.fallback(error);
    return Promise.resolve(new Response(this.message, {status: this.status}));
  }
}

export default ErrorHandler;