import service from "@/api/index";
import type { IProductRes } from "@/types/ITestPrisma";
import type { AxiosResponse } from "axios";

export function proRequest(): Promise<myLib.IResponseData<IProductRes[]>> {
  return service.get("/product/getProduct");
}

export function updateProRequest(
  id: string,
  params: any
): Promise<myLib.IResponseData<IProductRes>> {
  return service.put(`/product/updateProduct/${id}`, params);
}

export function addProRequest(
  params: any
): Promise<myLib.IResponseData<IProductRes>> {
  return service.post("/product/addProduct", params);
}

export function delProRequest(
  ids: string
): Promise<myLib.IResponseData<IProductRes[]>> {
  return service.delete(`/product/delProduct/${ids}`);
}
