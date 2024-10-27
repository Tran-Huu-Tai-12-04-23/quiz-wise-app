import { useInfiniteQuery } from "@tanstack/react-query";
import flatMap from "lodash/flatMap";
import { IQuiz } from "src/dto/quiz.dto";
import { endpoints } from "src/services/endpoints";
import rootApi from "src/services/rootApi";

export type Root = [IQuiz[], number];

type Variables = {
  where: Record<string, any>;
  skip: number;
  take: number;
};

type Response = {
  data: Root;
};

const useLoadQuizOfLibraryPagination = (
  variables: Variables,
  libId: string
) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    refetch,
    isRefetching,
    status,
  } = useInfiniteQuery({
    queryKey: [endpoints.QUIZ_OF_LIB_PAGINATION, variables],
    queryFn: ({ pageParam = 0 }) => {
      return rootApi.post<Variables, Response>(
        endpoints.QUIZ_OF_LIB_PAGINATION + "/" + libId,
        {
          ...variables,
          skip: pageParam,
        }
      );
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const [data, totalCount] = lastPage.data;
      const nextPage = pages.length * variables.take;
      return nextPage < totalCount ? nextPage : undefined;
    },
  });

  const formatData = data?.pages.flatMap((page) => page.data[0]) ?? [];
  const result: IQuiz[] = flatMap(formatData);

  return {
    isLoading,
    isError,
    data: result,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    fetchNextPage,
    status,
  };
};

export default useLoadQuizOfLibraryPagination;
