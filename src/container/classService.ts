import {ClassType} from "../types";
import Service from "./service";

class ClassService extends Service<ClassType>
{
  create<R = any, A = any>(args: A[] = []): R{
    return new this._value(...args);
  }
}

export default ClassService;