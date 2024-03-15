import { COOKIE_KEY } from "@/helpers/cookie";
import { isPath } from "./helpers";

export const clientPath = ["/aweb/auth/azure-ad"];

export const publicPath = [
  ...clientPath,
  "/auth/sign-in",
  "/404",
  "/500",
  "/401",
];
export const loginPath = ["/aweb/login"];

export const navigateCheck = ({
  pathname,
  cookie,
}: {
  pathname: string;
  cookie: string | any;
}) => {
  const isLoggedIn = cookie.get(COOKIE_KEY.token)?.value;
  const csrfToken = cookie.get(COOKIE_KEY.csrfToken)?.value;
  if (!isLoggedIn || !csrfToken) {
    if (isPath(pathname).isPrivatePath()) {
      pathname = `/auth/sign-in`;
    }
  }

  return pathname;
};

export * from "./helpers";
