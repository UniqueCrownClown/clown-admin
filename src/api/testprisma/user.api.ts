import service from "@/api/index";

export function proRequest() {
  return service.get("/users/getUser");
}

export function updateProRequest(id: string, params: any) {
  return service.put(`/users/updateUser/${id}`, params);
}

export function addProRequest(params: any) {
  return service.post("/users/addUser", params);
}

export function delProRequest(ids: string) {
  return service.delete(`/users/delUser/${ids}`);
}
