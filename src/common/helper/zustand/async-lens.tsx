import { Lens, lens } from '@dhmk/zustand-lens'
import { AxiosError } from 'axios'

type AsyncFn = (...args: any[]) => Promise<any>

type State<T = any> = {
  loading: boolean
  loaded: boolean
  error?: Error | AxiosError
  data: T
  execute: AsyncFn
  reset: () => void
}

type Set<T> = Parameters<Lens<State<T>>>[0]

export function asyncLens<T extends AsyncFn>(fn: T, initialData: Awaited<ReturnType<T>>) {
  return lens<State<Awaited<ReturnType<T>>>>((set) => ({
    loading: false,
    error: undefined,
    loaded: false,
    data: initialData,
    execute: execute(set, fn),
    reset: reset(set, initialData),
  }))
}

function reset<Response>(set: Set<Response>, initialData: Response) {
  return () => {
    set({
      loading: false,
      loaded: false,
      error: undefined,
      data: initialData,
    })
  }
}

function execute<T extends AsyncFn>(set: Set<any>, fn: T) {
  return ((...args: Parameters<T>) => {
    set({ loading: true })
    const promise = fn(...args)
    promise.then(onResolve(set))
    promise.catch(onReject(set))
    return promise
  }) as unknown as T
}

function onResolve(set: Set<any>) {
  return (data: any) =>
    set({
      loading: false,
      error: undefined,
      loaded: true,
      data,
    })
}

function onReject(set: Set<any>) {
  return (error: any) => {
    set({ loading: false, loaded: true, error })
  }
}

export const _internal = {
  onReject,
}
