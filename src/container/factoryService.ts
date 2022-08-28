import {FuncType} from "../types";
import Service from "./service";

class FactoryService extends Service<FuncType>
{
  create<R = any, A = any>(args: A[] = []): R{
    return this._value(...args);
  }
}

export default FactoryService;