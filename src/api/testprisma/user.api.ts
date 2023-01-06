import service from "@/api/index";
import type { IUserRes } from "@/types/ITestPrisma";

export function proRequest(): Promise<myLib.IResponseData<IUserRes[]>> {
  return service.get("/users/getUser");
}

export function updateProRequest(
  id: string,
  params: any
): Promise<myLib.IResponseData<IUserRes>> {
  return service.put(`/users/updateUser/${id}`, params);
}

export function addProRequest(
  params: any
): Promise<myLib.IResponseData<IUserRes>> {
  return service.post("/users/addUser", params);
}

export function delProRequest(
  ids: string
): Promise<myLib.IResponseData<IUserRes[]>> {
  return service.delete(`/users/delUser/${ids}`);
}
// 条件查询
export function proRequest2(
  pageSize: string,
  size: string,
  search: FilterOptionType
): Promise<myLib.IResponseData<IUserRes[]>> {
  return service.get("/users/getUser");
}
export interface UserInfo {
  name: string;
  email: string;
  createAt: string;
}
export interface FilterOptionType {
  name?: string;
  timeRange?: string;
}
