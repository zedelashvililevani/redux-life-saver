export interface Action<T> {
  type: string;
  cacheName: string;
  payload: T | null;
  error: string | null;
  reducer: string;
}

export interface IState<T> {
  isLoading?: boolean;
  isRefetching?: boolean;
  isFetchMore?: boolean;
  error: string | null;
  data: T;
}

export type InitialState<T> = { [x: string]: IState<T | null> };
export type InitialCacheState<T> = IState<T>;

export interface SelectorState<T> {
  [x: string]: InitialState<T>;
}