export interface IQuiz {
  id: string;
  correctAnswerIndex: number;
  options: string[];
  name: string;
  title?: string;
  totalQuestion: number;
}
