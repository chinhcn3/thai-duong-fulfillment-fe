import { Lens, lens } from '@dhmk/zustand-lens'
import { AxiosError } from 'axios'

type State<T = any> = {
  loading: boolean
  error?: Error | AxiosError
  data: T
}

type Set<T> = Parameters<Lens<State<T>>>[0]

type AsyncFn = (...args: any[]) => Promise<any>

export function asyncLens<T extends AsyncFn>(fn: T, initialData: Awaited<ReturnType<T>>) {
  return lens((set) => ({
    loading: false,
    error: undefined,
    data: initialData,
    execute: execute(set, fn),
    reset: reset(set, initialData),
  }))
}

function reset<Response>(set: Set<Response>, initialData: Response) {
  return () => {
    set({
      loading: false,
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
      data,
    })
}

function onReject(set: Set<any>) {
  return (error) => {
    set({ loading: false, error })
  }
}

export const _internal = {
  onReject,
}
