import { ButtonOutlined, ButtonPrimary } from "@components/Button";
import { Input } from "@components/Input";
import Row from "@components/Row";
import { useToast } from "@context/toastContext";
import { deviceWidth } from "@helper/utils";
import React, { useState } from "react";
import { IQuiz } from "src/dto/quiz.dto";
import { ILibrary } from "src/services/hooks/lib/dto";
import useSaveQuizToLib, {
  AddQuizToLibraryDTO,
} from "src/services/hooks/lib/useSaveQuizToLib";

function CreateQuizAndAddToLibrary({
  libSelected,
  onCreate,
  onClose,
  quizData,
}: {
  libSelected: ILibrary;
  onCreate: () => void;
  onClose: () => void;
  quizData: IQuiz[];
}) {
  const { showToast } = useToast();
  const [isCreate, setIsCreate] = useState(false);
  const { onSave, isLoading } = useSaveQuizToLib();
  const [state, setState] = useState<{
    name: string;
    description: string;
    nameError: string;
  }>({
    name: "",
    description: "",
    nameError: "",
  });
  const handleSaveToLib = async () => {
    if (state.name === "") {
      setState({ ...state, nameError: "Please enter quiz name" });
      return;
    }
    const body: AddQuizToLibraryDTO = {
      libraryId: libSelected.id,
      name: state.name,
      description: state.description,
      questions: quizData.map((item) => {
        return {
          title: item.title || item.name,
          options: item.options.join(","),
          correctAnswerIndex: item.correctAnswerIndex,
        };
      }),
    };
    await onSave(body).then(() => {
      onCreate();
      setIsCreate(false);
      onClose();
    });
  };
  return (
    <>
      {isCreate && (
        <Row full direction="column" start rowGap={10}>
          <Input
            placeholder="Enter Quiz Name"
            text={state.name}
            error={state.nameError}
            onChangeText={(val) => setState({ ...state, name: val })}
          />
          <Input
            multiple
            placeholder="Enter Quiz Description"
            text={state.description}
            onChangeText={(val) => setState({ ...state, description: val })}
          />

          <Row full center colGap={10}>
            <ButtonOutlined title="Cancel" onPress={() => setIsCreate(false)} />
            <ButtonPrimary
              minWidth={deviceWidth / 2}
              isLoading={isLoading}
              title="Save"
              onPress={handleSaveToLib}
            />
          </Row>
        </Row>
      )}
      {!isCreate && (
        <ButtonPrimary
          minWidth={"100%"}
          title="Add Quiz To Library"
          onPress={function (): void {
            if (!libSelected) {
              showToast("Please select a library to add quiz", "WARN");
              return;
            }
            onCreate();
            setIsCreate(!isCreate);
          }}
        />
      )}
    </>
  );
}

export default CreateQuizAndAddToLibrary;
