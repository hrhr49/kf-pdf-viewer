class Deferred<T> {
  promise: Promise<T>;
  _resolve: (value: T) => void;
  _reject: (reason?: any) => void;

  constructor() {
    this._resolve = () => {
      throw Error('_resolve is not initialized yet');
    };
    this._reject = () => {
      throw Error('_reject is not initialized yet');
    };
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resolve = (value: any) => this._resolve(value);
  reject = (reason?:any) => this._reject(reason);
}

export {
  Deferred,
};
