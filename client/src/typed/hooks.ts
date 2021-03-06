// generated by: rails generate ar_sync:types client/src/typed/

import { TypeRequest, ApiNameRequests } from './types'
import { DataTypeFromRequest } from 'ar_sync/core/DataType'
import { useArSyncModel as useArSyncModelBase, useArSyncFetch as useArSyncFetchBase } from 'ar_sync/graph/hooks'
export function useArSyncModel<R extends TypeRequest>(request: R | null) {
  return useArSyncModelBase<DataTypeFromRequest<ApiNameRequests[R['api']], R>>(request)
}
export function useArSyncFetch<R extends TypeRequest>(request: R | null) {
  return useArSyncFetchBase<DataTypeFromRequest<ApiNameRequests[R['api']], R>>(request)
}
