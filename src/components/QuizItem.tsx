import { useTheme } from "@context/themContext";
import { AntDesign } from "@expo/vector-icons";
import Helper, { normalize } from "@helper/helpers";
import { navigate } from "@navigation/NavigationService";
import { APP_ROUTE } from "@navigation/route";
import QuizIconItem from "assets/svg/quiz-item-icon";
import React from "react";
import { TouchableOpacity } from "react-native";
import { IQuiz } from "src/dto/quiz.dto";
import useDetailQuiz from "src/services/hooks/quiz/useDetailQuiz";
import { ButtonPrimary } from "./Button";
import Row from "./Row";
import TextDefault from "./TextDefault";

const defaultData: IQuiz = {
  id: "1",
  correctAnswerIndex: 0,
  options: [],
  name: "Statistics math quiz",
  totalQuestion: 12,
};
function QuizItem({ data = defaultData }: { data?: IQuiz }) {
  const { theme } = useTheme();
  const { data: quiz, isLoading, onDetail } = useDetailQuiz();

  const handlePlayQuiz = async () => {
    await onDetail(data.id).then(() => {
      navigate(APP_ROUTE.QUIZ_PLAY, { data: quiz?.question });
    });
  };
  return (
    <TouchableOpacity style={{ width: "100%" }}>
      <Row
        full
        between
        style={{
          padding: normalize(5),
          borderRadius: normalize(10),
          borderWidth: 1,
          borderColor: theme.primary,
          backgroundColor: theme.background,
        }}
      >
        <Row colGap={10} style={{ flex: 0.6 }}>
          <QuizIconItem />
          <Row start direction="column" rowGap={4}>
            <TextDefault size={normalize(16)} bold>
              {Helper.uppercaseFirstLetter(data.name)}
            </TextDefault>
            <TextDefault color={theme.textSecond}>
              {data.totalQuestion} questions
            </TextDefault>
          </Row>
        </Row>
        <ButtonPrimary
          iconRight={
            <AntDesign name="caretright" size={24} color={theme.background} />
          }
          isLoading={isLoading}
          onPress={handlePlayQuiz}
          title="Play"
        />
      </Row>
    </TouchableOpacity>
  );
}

export default QuizItem;
