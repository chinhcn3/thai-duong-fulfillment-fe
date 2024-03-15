import { parse } from "cookie";
import Cookies from "js-cookie";

export const COOKIE_KEY = {
  token: "token",
  csrfToken: "csrfToken",
  NEXT_LOCALE_ADMIN: "NEXT_LOCALE_ADMIN",
};

export const parseCookie = (cookie: string | Record<string, string>) => {
  if (cookie == undefined || cookie == null) {
    cookie = {};
  } else if (typeof cookie === "string") {
    cookie = parse(cookie);
  }
  return cookie;
};

export const clearSessionCookie = () => {
  Object.keys(COOKIE_KEY)
    .filter((key) => key !== "NEXT_LOCALE")
    .forEach((key) => Cookies.remove(key));
  // localStorage.removeItem("csrfTokenAdmin");
};
