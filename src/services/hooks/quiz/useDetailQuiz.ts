import { useToast } from "@context/toastContext"; // Assuming you have a toast context
import { useMutation } from "@tanstack/react-query";
import { IQuiz } from "src/dto/quiz.dto";
import { endpoints } from "src/services/endpoints";
import rootApi from "src/services/rootApi";

type Response = {
  id: string;
  name: string;
  description: string;
  totalQuestion: number;
  question: IQuiz[];
};

const useDetailQuiz = () => {
  const { showToast } = useToast();
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      const response = await rootApi.get<Response>(`${endpoints.QUIZ}/${id}`);
      return response.data;
    },
    onError: (e: any) => {
      showToast(e?.response?.data?.message || "An error occurred", "ERROR");
    },
  });

  return {
    isLoading: isPending,
    isError,
    data,
    error,
    onDetail: mutateAsync,
  };
};

export default useDetailQuiz;
