import service from "@/api/index";

export function addressRequest() {
  return service.get("/address/getAddress");
}

export function updateAddressRequest(id: string, params: any) {
  return service.put(`/address/updateAddress/${id}`, params);
}

export function addAddressRequest(params: any) {
  return service.post("/address/addAddress", params);
}

export function delAddressRequest(ids: string) {
  return service.delete(`/address/delAddress/${ids}`);
}
