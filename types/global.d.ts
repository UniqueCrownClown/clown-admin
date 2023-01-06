declare namespace myLib {
  interface IResponseData<T> {
    code: number;
    data: T;
    message: string;
  }
}
