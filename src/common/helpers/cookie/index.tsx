import { parse } from 'cookie'
export const COOKIE_KEY = {
  logged_in: 'logged_in',
}

export const parseCookie = (cookie: string | Record<string, string>) => {
  if ([undefined, null].includes(cookie)) {
    cookie = {}
  } else if (typeof cookie === 'string') {
    cookie = parse(cookie)
  }
  return cookie
}

export const setSessionCookie = () => {}

export const clearSessionCookie = () => {}
