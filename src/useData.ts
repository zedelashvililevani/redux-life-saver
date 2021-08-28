import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NetworkStatusEnum, ActionsEnum } from './enums';
import { Action, SelectorState, IState } from './types';
import { fetcher, objectToKey, paramsToUri } from './utils/fetch';
import { initReadCache } from './readCache';
import { initWriteCache } from './writeCache';

interface initParams {
  serverUrl: string;
  fetchOptions?: object;
  customFetch?: <T>(url: string, options: object) => Promise<T>;
}
interface useDataParams {
  url: string;
  params?: object;
  cacheOnly?: boolean;
  cacheOptions?: object;
}

interface RefetchParams {
  fetchUrl?: string;
  fetchParams?: object;
}

export const initUseData = ({
  serverUrl,
  fetchOptions = {},
  customFetch = fetcher,
}: initParams) => {
  // main thing to use xD
  const useReadCache = initReadCache();
  const useWriteCache = initWriteCache();
  const useData = <TData>(
    reducerName: string,
    { url, params = {}, cacheOnly = false, cacheOptions }: useDataParams,
  ) => {
    const cacheName = objectToKey(cacheOptions) || reducerName;
    const dispatch = useDispatch();
    const { isLoading, isRefetching, isFetchMore, error, data } = useSelector<SelectorState<TData>, IState<TData>>(
      data => (data[reducerName][cacheName] || data[reducerName]) as IState<TData>,
    );

    //temp
    useEffect(() => {
      if (!cacheOnly) fetch();
    }, []);

    const takeAction = (
      actionName: string,
      newData: TData | null = data,
      error: string | null = null,
      cacheKey: string = cacheName,
    ): Action<TData> => {
      return {
        type: actionName,
        cacheName: cacheKey,
        payload: newData,
        error: error,
        reducer: reducerName,
      };
    };

    const fetchData = (uriParams = params, fetchUrl = url) => {
      const uri = paramsToUri(fetchUrl, uriParams);
      return customFetch<TData>(serverUrl + uri, fetchOptions);
    };

    const fetch = async ({ fetchParams = params, fetchUrl = url }: RefetchParams = {}) => {
      dispatch(takeAction(reducerName + ActionsEnum.request));
      try {
        const responseData = await fetchData(fetchParams, fetchUrl);
        return dispatch(takeAction(reducerName + ActionsEnum.fetch, responseData));
      } catch (e) {
        return dispatch(takeAction(e));
      }
    };

    const reFetch = async () => {
      dispatch(takeAction(reducerName + ActionsEnum.refetch));
      try {
        const responseData = await fetchData(params, url);
        return dispatch(takeAction(reducerName + ActionsEnum.fetch, responseData));
      } catch (e) {
        return dispatch(takeAction(e));
      }
    };

    const fetchMore = async (params: object = {}) => {
      dispatch(takeAction(reducerName + ActionsEnum.fetchMoreRequest));
      try {
        const responseData = await fetchData(params);
        return dispatch(takeAction(reducerName + ActionsEnum.fetchMore, responseData));
      } catch (e) {
        return dispatch(takeAction(e));
      }
    };

    const getNetworkStatus = () => {
      if (isLoading) return NetworkStatusEnum.loading;
      if (isRefetching) return NetworkStatusEnum.refetch;
      if (error) return NetworkStatusEnum.error;
      if (isFetchMore) return NetworkStatusEnum.fetchMore;
      return NetworkStatusEnum.ready;
    };

    return {
      data,
      fetch,
      reFetch,
      fetchMore,
      networkStatus: getNetworkStatus(),
    };
  };

  return { useData, useReadCache, useWriteCache };
};
