import { useInfiniteQuery } from "@tanstack/react-query";
import flatMap from "lodash/flatMap";
import { endpoints } from "src/services/endpoints";
import rootApi from "src/services/rootApi";
import { ILibrary } from "./dto";

export type Root = [ILibrary[], number];

type Variables = {
  where: Record<string, any>;
  skip: number;
  take: number;
};

type Response = {
  data: Root;
};

const useLibPagination = (variables: Variables) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isFetching,
    isLoading,
    refetch,
    status,
  } = useInfiniteQuery({
    queryKey: [endpoints.LIB_PAGINATION, variables],
    queryFn: ({ pageParam = 0 }) => {
      return rootApi.post<Variables, Response>(endpoints.LIB_PAGINATION, {
        ...variables,
        skip: pageParam,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const [data, totalCount] = lastPage.data;
      const nextPage = pages.length * variables.take;
      return nextPage < totalCount ? nextPage : undefined;
    },
  });

  const formatData = data?.pages.flatMap((page) => page.data[0]) ?? [];
  const result: ILibrary[] = flatMap(formatData);

  return {
    isLoading,
    isError,
    data: result,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    status,
  };
};

export default useLibPagination;
