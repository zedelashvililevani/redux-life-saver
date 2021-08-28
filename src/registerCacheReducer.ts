import produce from "immer";
import { Action, InitialCacheState } from "./types";
import { ActionsEnum } from "./enums";
interface RegisterCacheReducerParams<T> {
  reducerName: string;
  initCache: T;
  onError?: (payload: T | null) => string | null;
}
interface ReducerResult<T> {
  [x: string]: (
    state: InitialCacheState<T>,
    action: Action<T>
  ) => InitialCacheState<T>;
}

export function registerCacheReducer<TData = any>({
  reducerName,
  onError,
  initCache,
}: RegisterCacheReducerParams<TData>): ReducerResult<TData> {
  const cache: InitialCacheState<TData> = {
    data: initCache,
    error: null,
  };

  const reducer = (
    state: InitialCacheState<TData> = cache,
    action: Action<TData>
  ) => {
    // this will provide O(n) instead of O(n * cases)
    if (action.reducer !== reducerName) return state;

    return produce(state, (draft: InitialCacheState<TData>) => {
      if (!action.payload) draft = state;
      else
        switch (action.type) {
          case reducerName + ActionsEnum.error: {
            if (onError) draft.error = onError(action.payload);
            else draft.error = action.error;
            break;
          }
          case reducerName + ActionsEnum.writeCache: {
            draft.data = action.payload;
            break;
          }
          default: {
            draft = state;
          }
        }
    });
  };
  return {
    [reducerName]: reducer,
  };
}
