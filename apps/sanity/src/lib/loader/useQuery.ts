import * as queryStore from "@sanity/react-loader";
import {
  type QueryParams,
  type QueryResponseInitial,
  type UseQueryOptionsDefinedInitial,
} from "@sanity/react-loader";

import { PAGE_BY_SLUG_QUERY } from "@/lib/api/queries";
import { type PagePayload } from "@/lib/types";

/**
 * Exports to be used in client-only or components that render both server and client
 */
export const useQuery = <
  QueryResponseResult = unknown,
  QueryResponseError = unknown,
>(
  query: string,
  params?: QueryParams,
  options?: UseQueryOptionsDefinedInitial<QueryResponseResult>,
) => {
  const snapshot = queryStore.useQuery<QueryResponseResult, QueryResponseError>(
    query,
    params,
    options,
  );

  // Always throw errors if there are any
  if (snapshot.error) {
    throw snapshot.error;
  }

  return snapshot;
};

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */
export function usePage({
  params,
  initial,
}: {
  initial: QueryResponseInitial<PagePayload | null>;
  params?: QueryParams;
}) {
  return useQuery<PagePayload | null>(PAGE_BY_SLUG_QUERY, params, { initial });
}