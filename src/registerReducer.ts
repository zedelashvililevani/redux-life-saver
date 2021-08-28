import produce from 'immer';
import { Action, InitialState, IState } from './types';
import { ActionsEnum } from './enums';
// This must be enum, but whatever

interface RegisterReducerParams<T> {
  reducerName: string;
  onFetch?: (payload: T | null) => T | null;
  onFetchMore?: (newData: T | null, prevData: T | null) => T | null;
  onError?: (payload: T | null) => string | null;
}

const initialState: IState<null> = {
  isLoading: false,
  isRefetching: false,
  isFetchMore: false,
  data: null,
  error: null,
};

interface ReducerResult<T> {
  [x: string]: (state: InitialState<T | null>, action: Action<T>) => InitialState<T | null>;
}

export function registerReducer<TData = any>({
  reducerName,
  onFetch,
  onFetchMore,
  onError,
}: RegisterReducerParams<TData>): ReducerResult<TData> {
  const reducer = (state: InitialState<TData | null>, action: Action<TData>) => {
    // console.log(action.type, action, action.error, reducerName);
    // this will provide O(n) instead of O(n * cases)
    if (!state) return { [reducerName]: initialState };
    if (action.reducer !== reducerName) return state;
    return produce(state, (draft: InitialState<TData | null>) => {
      if (!draft[action.cacheName]) draft[action.cacheName] = initialState;
      const actions = {
        [reducerName + ActionsEnum.error]: () => {
          if (onError) draft[action.cacheName].error = onError(action.payload);
          else draft[action.cacheName].error = action.error;
        },
        [reducerName + ActionsEnum.request]: () => {
          draft[action.cacheName].isLoading = true;
        },
        [reducerName + ActionsEnum.refetch]: () => {
          draft[action.cacheName].isRefetching = true;
        },
        [reducerName + ActionsEnum.fetch]: () => {
          draft[action.cacheName].isLoading = false;
          draft[action.cacheName].isRefetching = false;
          if (onFetch) draft[action.cacheName].data = onFetch(action.payload);
          else draft[action.cacheName].data = action.payload;
        },
        [reducerName + ActionsEnum.fetchMoreRequest]: () => {
          draft[action.cacheName].isFetchMore = true;
        },
        [reducerName + ActionsEnum.fetchMore]: () => {
          draft[action.cacheName].isFetchMore = false;
          if (onFetchMore) draft[action.cacheName].data = onFetchMore(action.payload, state[action.cacheName].data);
        },
        [reducerName + ActionsEnum.writeCache]: () => {
          draft[action.cacheName].data = action.payload;
        },
      };
      actions[action.type]();
    });
  };
  return {
    [reducerName]: reducer,
  };
}
