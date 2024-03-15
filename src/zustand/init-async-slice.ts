import { produce } from "immer";
import {
  createWithMiddlewares,
  InitSliceOptions,
  StateData,
  autoName,
  registerReset,
} from "./middlewares";
import { AxiosError } from "axios";
import { useEffect } from "react";

export type AsyncState<
  T extends object = any,
  F extends object = any,
  E extends object = any,
> = {
  _loading?: boolean;
  _error?: E | AxiosError | Error;
  data?: T;
  filters?: F; // filters, sorters, paginations
  filterFn?: (filters?: F) => Promise<AsyncState<T, F, E>>;
};

export type FilterFunction<T extends object = any, F extends object = any> = (
  filters?: F
) => Promise<AsyncState<T, F>>;

export const initAsyncSlice = <
  T extends object = any,
  F extends object = any,
  E extends object = any,
>(
  name: string,
  data?: T,
  filters?: F,
  filterFn?: AsyncState<T, F, E>["filterFn"],
  options?: InitSliceOptions
) => {
  const getInitState = (state = { data, filters }): AsyncState => ({
    ...JSON.parse(JSON.stringify(state)),
    filterFn,
  });

  const slice = createWithMiddlewares<AsyncState<T, F, E>>(
    () => getInitState(),
    name,
    options
  );

  const setState = (
    fn: StateData<AsyncState<T, F, E>>,
    actionName?: string,
    replace: boolean = false
  ) => {
    const state = typeof fn !== "function" ? fn : fn(slice.getState());
    slice.setState(
      state,
      replace,
      actionName || autoName(state) || `_set:state`
    );
  };

  const setFilterFn = (filterFn: AsyncState<T, F, E>["filterFn"]) =>
    setState({ filterFn }, "_set:fetcher");

  const setData = (fn: StateData<T>, actionName?: string) => {
    const data =
      typeof fn !== "function"
        ? fn
        : (fn as Function)(slice.getState().data as T);
    setState({ data }, actionName || `_set:data`);
  };

  const setFilters = (
    fn: StateData<F>,
    triggerQuery = false,
    actionName?: string
  ) => {
    const filters =
      typeof fn !== "function"
        ? fn
        : (fn as Function)(slice.getState().filters);
    setState({ filters }, actionName || `set:filters`);
    if (triggerQuery) onFilterChange();
  };

  const onFilterStart = (clearError = true, clearData = false) => {
    setState(
      (state) =>
        produce(state, (d) => {
          d._loading = true;
          clearError && delete d._error;
          clearData && delete d.data;
        }),
      `_load:start`
    );
  };

  const onFilterSuccess = (result?: AsyncState<T, F, E>) => {
    setState(
      (state) =>
        produce(state, (d) => {
          d._loading = false;
          Object.assign(d, result);
        }),
      `_load:success`
    );
  };

  const onFilterFail = (_error: E, clearData = false) => {
    setState(
      (state) =>
        produce(state, (d) => {
          d._loading = false;
          d._error = _error as any;
          clearData && delete d.data;
        }),
      `_load:fail`
    );
  };

  const onFilterChange = async (
    newfilterFn?: AsyncState<T, F, E>["filterFn"]
  ) => {
    onFilterStart();
    try {
      const { filters, filterFn } = slice.getState();
      const result = await (newfilterFn || filterFn)?.(filters);
      onFilterSuccess(result);
    } catch (error: any) {
      onFilterFail(error);
    }
  };

  const reset = () => slice.setState(() => getInitState(), true, `_reset`);
  registerReset(name, reset);

  const usePrepare = (
    lazyState?: StateData<AsyncState<T, F, E>>,
    resetOnExit = true
  ) => {
    useEffect(() => {
      lazyState && setState(lazyState);
      return () => {
        resetOnExit && reset();
      };
    }, []);
  };

  return {
    useSlice: slice,
    usePrepare,
    getState: slice.getState,
    setState,
    setFilterFn,
    setData,
    setFilters,
    onFilterChange,
    onFilterStart,
    onFilterSuccess,
    onFilterFail,
  };
};
