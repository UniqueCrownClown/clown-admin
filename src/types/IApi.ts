export interface IApi {
  fetch(url: string): Promise<any>;
}
