import { useDispatch } from "react-redux";
import { ActionsEnum } from './enums';
import { Action } from './types';
import { objectToKey } from './utils/fetch';

export const initWriteCache = () => {
  const useWriteCache = () => {
    const dispatch = useDispatch();
    const writeCache = <T>(reducerName: string, cache: T, cacheOptions?: object) => {
      const cacheKey = objectToKey(cacheOptions) || reducerName;
      const action: Action<T> = {
        type: reducerName + ActionsEnum.writeCache,
        payload: cache,
        error: '',
        reducer: reducerName,
        cacheName: cacheKey,
      };

      dispatch(action);
    };
    return writeCache;
  };
  return useWriteCache;
};
