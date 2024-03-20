import { useGlobalState } from '../use-global-state'
export const LANG_KEY = 'lang'

const initLang: SharedTypes.LanguageType = 'vn'

/**
 * Only use to get language
 * should use useLocaleMessages instead
 */
export function useLanguage(): [
  SharedTypes.LanguageType,
  React.Dispatch<React.SetStateAction<SharedTypes.LanguageType>>,
] {
  const [lang = initLang, setLang] = useGlobalState<SharedTypes.LanguageType>(LANG_KEY)
  return [lang, setLang]
}

export type AllLocaleTypes = Record<SharedTypes.LanguageType, Record<string, any>>

export function useLocaleMessages<T extends AllLocaleTypes>(locale: T): T['vn'] {
  const [lang] = useGlobalState<SharedTypes.LanguageType>(LANG_KEY)
  return locale[lang || initLang] as T['vn']
}
