import { useToast } from "@context/toastContext";
import { useMutation } from "@tanstack/react-query";
import { endpoints } from "src/services/endpoints";
import rootApi from "src/services/rootApi";
export interface QuestionDTO {
  title: string;
  options: string;
  correctAnswerIndex: number;
}

export interface AddQuizToLibraryDTO {
  libraryId: string;
  name: string;
  description: string;
  questions: QuestionDTO[];
}
type Variables = AddQuizToLibraryDTO;

type Response = {
  data: {
    message: string;
  };
};

const useSaveQuizToLib = () => {
  const { showToast } = useToast();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: Variables) =>
      rootApi.post<Variables, Response>(endpoints.ADD_QUIZ_TO_LIB, variables),
    onError: (error: any) => {
      showToast("Failed!", "ERROR", error?.response?.data?.message);
    },
    onSuccess: async (data) => {
      showToast("Successfully!", "SUCCESS", data?.data.message);
    },
  });

  return {
    isLoading: isPending,
    isError,
    data,
    error,
    onSave: mutateAsync,
  };
};

export default useSaveQuizToLib;
