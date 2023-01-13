import service from "@/api/index";

export function orderRequest() {
  return service.get("/order/getOrder");
}

export function orderAllRequest(pageSize: string, page: string) {
  return service.get(`/order/getAll?page=${page}&limit=${pageSize}`);
}

export function updateOrderRequest(id: string, params: any) {
  return service.put(`/order/updateOrder/${id}`, params);
}

export function addOrderRequest(params: any) {
  return service.post("/order/addOrder", params);
}

export function delOrderRequest(ids: string) {
  return service.delete(`/order/delOrder/${ids}`);
}
