import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { IQuiz } from "src/dto/quiz.dto";
import { endpoints } from "src/services/endpoints";
import rootApi from "src/services/rootApi";

type variables = {
  level: string;
  type: string;
  description: string;
};

type response = {
  data: IQuiz[];
};

const useCreateQuiz = () => {
  const { isPending, isError, data, error, mutateAsync, mutate } = useMutation({
    mutationFn: (variables: variables) =>
      rootApi.post<variables, response>(endpoints.QUIZ_CREATE, {
        ...variables,
      }),
    onError: (e: any) => {
      if (e?.message === "Network Error") {
        Alert.alert("Cảnh báo", "Không có kết nối mạng. Vui lòng kiểm tra lại");
        return;
      }
      Alert.alert(
        "Cảnh báo",
        e?.response?.data?.message ?? "Đã có lỗi xảy ra vui lòng thử lại sau"
      );
    },
  });

  return {
    isLoading: isPending,
    isError,
    data: data?.data,
    error: error?.response?.data?.message,
    mutateAsync,
    mutate,
  };
};

export default useCreateQuiz;
