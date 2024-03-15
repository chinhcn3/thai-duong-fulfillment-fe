/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, StateCreator, StoreMutatorIdentifier } from 'zustand'
import { devtools, persist, PersistOptions } from 'zustand/middleware'

export const getDevtools =
  (name: string): typeof devtools =>
  (f, options) =>
    devtools(f, {
      store: `${name}`,
      name: 'ALL_STORE',
      ...options,
    })

type TypePersist = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
  U = T
>(
  initializer: StateCreator<T, [...Mps, ['zustand/persist', unknown]], Mcs>,
  options?: PersistOptions<T, U>
) => StateCreator<T, Mps, [['zustand/persist', U], ...Mcs]>

export const getPersist =
  (name: string): TypePersist =>
  (f, options) =>
    persist(f, {
      name,
      ...options,
    })

type InitSliceOptions = {
  isPersist?: boolean
}

const createWithMiddlewares = <T>(initState: T, name: string, options?: InitSliceOptions) => {
  const devtoolsMw = getDevtools(name)
  let middleware = devtoolsMw(() => ({ ...initState }))
  if (options?.isPersist) {
    const persistMw = getPersist(name)
    middleware = persistMw(middleware) as StateCreator<T, [], [['zustand/devtools', never]]>
  }
  return create<T>()(middleware)
}

type StateData<T> = T | Partial<T> | ((state: T) => T | Partial<T>)

export const initSlice = <T>(initState: T, name: string, options?: InitSliceOptions) => {
  const slice = createWithMiddlewares<T>(initState, name, options)

  const actions = (actionName: string, fn: StateData<T>) => {
    slice.setState(
      state => {
        const data = typeof fn === 'function' ? (fn as Function)?.(state) : fn
        return { ...state, ...data }
      },
      false,
      actionName
    )
  }

  const getData = () => slice.getState()
  const setData = (fn: StateData<T>) => actions(`~data`, fn)

  const reset = () => slice.setState(() => ({ ...initState }), false, `~reset`)
  registerReset(name, reset)

  return {
    useSlice: slice,
    actions,
    getData,
    setData,
    reset,
  }
}

type AsyncState<T> = {
  loading?: boolean
  error?: Error
  data: T
}
const asyncState = <T>(initState: T): AsyncState<T> => ({
  loading: false,
  error: undefined,
  data: initState,
})

export const initAsyncSlice = <T extends object>(initState: T, name: string, options?: InitSliceOptions) => {
  const initAsyncState = asyncState(initState)
  const slice = createWithMiddlewares<AsyncState<T>>(initAsyncState, name, options)

  const actions = (actionName: string, fn: StateData<T>) => {
    slice.setState(
      state => {
        const data = typeof fn === 'function' ? (fn as Function)?.(state.data) : fn
        return { ...state, data }
      },
      false,
      actionName
    )
  }

  const getLoading = () => slice.getState().loading
  const setLoading = (loading: boolean) => slice.setState(state => ({ ...state, loading }), false, `~loading`)

  const getError = () => slice.getState().error
  const setError = (error: Error) => slice.setState(state => ({ ...state, error }), false, `~error`)

  const getData = () => slice.getState().data
  const setData = (fn: StateData<T>) => actions(`~data`, fn)

  const loadData = async (fn: () => Promise<T>) => {
    setLoading(true)
    try {
      const data = await fn()
      setData(data)
    } catch (error) {
      setError(error as Error)
    }
    setLoading(false)
  }

  const reset = () => slice.setState(() => ({ ...initAsyncState }), false, `~reset`)
  registerReset(name, reset)

  return {
    useSlice: slice,
    actions,
    getLoading,
    setLoading,
    getError,
    setError,
    setData,
    getData,
    loadData,
  }
}

const allReset: Record<string, () => void> = {}
const registerReset = (name: string, reset: () => void) => {
  allReset[name] = reset
}
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

export type Pagination = {
  total?: number
  current?: number
  pageSize: number
}

export const defaultPagination: Pagination = {
  total: 1,
  current: 1,
  pageSize: 1,
}
