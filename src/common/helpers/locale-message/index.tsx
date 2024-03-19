export const getLocaleMessage =
  <T,>(locale: any) =>
  (key: T): string => {
    const lang = 'en'
    return locale?.[lang]?.[key] ?? ''
  }
