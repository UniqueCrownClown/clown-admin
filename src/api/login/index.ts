import service from "@/api/index";
interface LoginParams {
  name: string;
  password: string;
}
export function loginRequest(params: LoginParams) {
  return service.post('/login', params);
}
