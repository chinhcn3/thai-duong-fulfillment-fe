import { StateCreator, StoreMutatorIdentifier, create } from 'zustand'
import { PersistOptions, devtools, persist, subscribeWithSelector } from 'zustand/middleware'

export const getDevtools =
  (name: string): typeof devtools =>
  (f, options) =>
    devtools(f, {
      store: `${name}`,
      name: 'ALL_STORE',
      ...options,
    })

export const getPersist =
  (name: string): TypePersist =>
  (f, options) => {
    const partialize = (state: any) => {
      if (!Array.isArray(state) && typeof state === 'object') {
        return Object.fromEntries(
          // not sync these field to storage
          Object.entries(state as object).filter(([key]) => ['_error', '_loading'].includes(key))
        )
      }
      return state
    }
    return persist(f, {
      name,
      ...options,
      partialize,
    })
  }

export const createWithMiddlewares = <T>(
  initState: StateCreator<T, [], []>,
  name: string,
  options?: InitSliceOptions
) => {
  const devtoolsMw = getDevtools(name)
  let middleware = devtoolsMw(subscribeWithSelector(initState))
  if (options?.isPersist) {
    const persistMw = getPersist(name)
    middleware = persistMw(middleware) as any
  }
  const slice = create<T>()(middleware)
  return slice
}

type TypePersist = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
  U = T
>(
  initializer: StateCreator<T, [...Mps, ['zustand/persist', unknown]], Mcs>,
  options?: PersistOptions<T, U>
) => StateCreator<T, Mps, [['zustand/persist', U], ...Mcs]>

export type InitSliceOptions = {
  isPersist?: boolean
}

export type StateData<T = any> = T | Partial<T> | ((state: T) => T | Partial<T>)

const allReset: Record<string, () => void> = {}

export const registerReset = (name: string, reset: () => void) => (allReset[name] = reset)
type ResetOptions = {
  slices?: string[]
  components?: string[]
  regex?: RegExp
}

export const resetAll = (options?: ResetOptions) => {
  let keys = Object.keys(allReset)
  if (options?.slices && options.slices.length > 0) {
    keys = options.slices
  }
  if (options?.components && options.components.length > 0) {
    keys = keys.filter(e => options?.components?.some(com => e.startsWith(com)))
  }
  if (options?.regex) {
    keys = keys.filter(e => options.regex?.test(e))
  }
  keys.forEach(e => allReset[e]())
}

export const autoName = <T extends object>(state: T) => `_set:${Object.keys(state).join(',')}`
