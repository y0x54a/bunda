abstract class Service<V = any>
{
  protected _value: any;
  protected _exports: any;
  protected _isResolved: boolean = false;

  constructor(value: V){
    this._value = value;
  }

  get value(): V{
    return this._value;
  }

  get exports(): any{
    return this._exports;
  }

  get isResolved(): boolean{
    return this._isResolved;
  }

  resolve<R = any, A = any>(args?: A[]): R{
    return this._isResolved ? this._exports : (this._isResolved = true, this._exports = this.create(args));
  }

  create<R = any, A = any>(args?: A[]): R{
    return this._value;
  }
}

export default Service;