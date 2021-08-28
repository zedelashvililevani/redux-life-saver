import { useSelector } from "react-redux";
import { InitialCacheState, SelectorState } from './types';
import { objectToKey } from './utils/fetch';

export const initReadCache = () => {
  const readCache = <TData>(reducerName: string, cacheOptions?: object) => {
    const { data } = useSelector<SelectorState<TData>, InitialCacheState<TData>>(data => {
      const cacheName = objectToKey(cacheOptions) || reducerName;
      const myData = data[reducerName][cacheName] || data[reducerName];
      return myData as InitialCacheState<TData>;
    });
    return data;
  };
  return readCache;
};
