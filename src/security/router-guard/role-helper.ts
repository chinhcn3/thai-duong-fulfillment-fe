import { authUserInfoStore } from "@/stores/auth/auth-store";

export enum EnumRole {
  ADMIN = 1,
  MEMBER = 2,
}
export const roleHelper = () => {
  const data: any = authUserInfoStore.useSlice((state) => state).data;
  const isAdmin =
    data?.user_store &&
    data?.user_store.length > 0 &&
    data?.user_store[0]?.store_role?.id == EnumRole.ADMIN;
  return { role: data?.user_store, isAdmin };
};
