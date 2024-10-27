import { useToast } from "@context/toastContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "src/services/endpoints";
import rootApi from "src/services/rootApi";

type Variables = {
  name: string;
};

type Response = {
  data: {
    message: string;
  };
};

const useCreateLibrary = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: Variables) =>
      rootApi.post<Variables, Response>(endpoints.LIB, variables),
    onError: (error: any) => {
      showToast("Failed!", "ERROR", error?.response?.data?.message);
    },
    onSuccess: async (data) => {
      showToast("Successfully!", "SUCCESS", data?.data.message);
      queryClient.invalidateQueries({
        queryKey: [endpoints.LIB_PAGINATION],
      });
    },
  });

  return {
    isLoading: isPending,
    isError,
    data,
    error,
    onCreate: mutateAsync,
  };
};

export default useCreateLibrary;
