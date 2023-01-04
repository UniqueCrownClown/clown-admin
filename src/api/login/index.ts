import service from "@/api/index";
interface LoginParams {
  name: string;
  password: string;
}
export function signinRequest(params: LoginParams) {
  return service.post("/auth/signin", params);
}

export function signupRequest(params: LoginParams) {
  return service.post("/auth/signup", params);
}
