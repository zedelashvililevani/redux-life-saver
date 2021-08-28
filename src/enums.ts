export enum ActionsEnum {
  error = "Error",
  request = "Request",
  fetch = "Fetch",
  refetch = "Refetch",
  fetchMoreRequest = "FetchMoreRequest",
  fetchMore = "FetchMore",
  writeCache = "WriteCache",
}

export enum NetworkStatusEnum {
  ready = 1,
  loading = 2,
  refetch = 3,
  fetchMore = 4,
  error = 5,
}
