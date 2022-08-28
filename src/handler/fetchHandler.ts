import {
  ResponseType,
  ContextInterface,
  RouteHandlerInterface
} from "../types";

export type FetchHandlerOptionsType = {
  status?: number;
  message?: string;
}

class FetchHandler implements RouteHandlerInterface
{
  readonly status: number;
  readonly message: string;

  constructor({status = 404, message = "404 / Not Found"}: FetchHandlerOptionsType = {}) {
    this.status = status;
    this.message = message;
  }

  handle(context: ContextInterface): ResponseType{
    return context.response(this.message, this.status);
  }
}

export default FetchHandler;