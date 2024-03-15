import { useEffect } from 'react'
import { createWithMiddlewares, InitSliceOptions, StateData, autoName, registerReset } from './middlewares'

export const initSlice = <T extends object>(name: string, initState: T, options?: InitSliceOptions) => {
  const getInitState = (state = initState) => ({
    ...JSON.parse(JSON.stringify(state)),
  })

  const slice = createWithMiddlewares<T>(() => getInitState(), name, options)

  const setState = (fn: StateData<T>, actionName?: string, replace: boolean = false) => {
    const state = typeof fn !== 'function' ? fn : fn(slice.getState())
    slice.setState(state, replace || false, actionName || autoName(state))
  }

  const reset = () => slice.setState(() => getInitState(), true, `_reset`)
  registerReset(name, reset)

  const usePrepare = (lazyState?: StateData<T>, resetOnExit = true) => {
    useEffect(() => {
      lazyState && setState(lazyState)
      return () => {
        resetOnExit && reset()
      }
    }, [])
  }

  return {
    useSlice: slice,
    usePrepare,
    getState: slice.getState,
    setState,
    reset,
  }
}
