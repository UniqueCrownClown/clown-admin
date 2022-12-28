import service from "@/api/index";

export function proRequest() {
  return service.get("/product/getProduct");
}

export function updateProRequest(id: string, params: any) {
  return service.put(`/product/updateProduct/${id}`, params);
}

export function addProRequest(params: any) {
  return service.post("/product/addProduct", params);
}

export function delProRequest(ids: string) {
  return service.delete(`/product/delProduct/${ids}`);
}
