import { IQuiz } from "src/dto/quiz.dto";

export interface ActivityType {
  name: string;
  date: string;
  price: string;
  cardId: number;
}

const data: IQuiz[] = [
  {
    title: "What is the synonym of 'happy'?",
    options: ["Sad", "Joyful", "Angry", "Bored"],
    correctAnswerIndex: 1,
  },
];

export { data };
