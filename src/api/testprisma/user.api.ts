import service from "@/api/index";
import type { IUserRes } from "@/types/ITestPrisma";
import qs from "qs";

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
export function proAllRequest(
  pageSize: string,
  page: string,
  search: FilterOptionType
): Promise<myLib.IResponseData<IUserRes[]>> {
  const param = {
    page,
    limit: pageSize,
    ...(search.name ? { filter: { name: `contains:${search.name}` } } : null),
  };
  return service.get(
    `/users/getAll?${qs.stringify(param, { allowDots: true })}`
  );
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
