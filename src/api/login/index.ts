import service from "@/api/index";
interface LoginParams {
  name: string;
  password: string;
}
export function signinRequest(
  params: LoginParams
): Promise<myLib.IResponseData<any>> {
  return service.post("/auth/signin", params);
}

export function signupRequest(
  params: LoginParams
): Promise<myLib.IResponseData<any>> {
  return service.post("/auth/signup", params);
}
