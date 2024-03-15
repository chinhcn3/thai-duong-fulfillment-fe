import { AuthService } from "@/swagger-api";
import { User } from "@/swagger-api/gen/data-contracts";
import { initAsyncSlice } from "@/zustand/init-async-slice";

const initData: any = {};
const getMe = async () => {
  const user = await AuthService.authControllerMe();
  return { data: user.data.data };
};
export const authUserInfoStore = initAsyncSlice<any>(
  "auth-user",
  initData,
  {},
  getMe
);
