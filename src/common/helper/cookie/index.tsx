import { parse } from 'cookie'
import Cookies from 'js-cookie'

let cookieExpires = 1

export const getCookieExpires = () => cookieExpires

export enum COOKIE_KEY {
  logged_in = 'logged_in'
}

export type CookieKeyType = keyof typeof COOKIE_KEY

export type CookieObjectType = Partial<Record<CookieKeyType, string>>

export const parseCookie = (cookie: string | Record<string, string>): CookieObjectType => {
  // @ts-ignore
  if ([undefined, null].includes(cookie)) {
    cookie = {}
  } else if (typeof cookie === 'string') {
    cookie = parse(cookie)
  }
  return cookie as CookieObjectType
}


export const setSessionCookie = (session: any) => {
  const csrfToken = session?.csrf_token
  localStorage.setItem('csrfToken', csrfToken as string)
  const oneDay = 86400
  const expires = ((session)?.cookie_max_age || oneDay) / oneDay
  cookieExpires = expires
  Cookies.set(COOKIE_KEY.logged_in, `${true}`, {
    expires,
  })
}

export const setMeCookie = () => {
}



export const clearSessionCookie = () => {
  localStorage.removeItem('csrfToken')
}
