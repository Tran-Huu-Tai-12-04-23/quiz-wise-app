import EmptyView from "@components/EmptyView";
import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import Helper, { normalize } from "@helper/helpers";
import FolderIcon from "assets/svg/folder-icon";
import React from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { IQuiz } from "src/dto/quiz.dto";
import { ILibrary } from "src/services/hooks/lib/dto";
import CreateQuizAndAddToLibrary from "./CreateQuizAndAddToLibrary";

function LibView({
  data,
  isLoading,
  onSelected,
  libSelected,
  onClose,
  quizData,
}: {
  data: ILibrary[];
  isLoading: boolean;
  onSelected: (val: ILibrary) => void;
  libSelected: ILibrary | null;
  onClose: () => void;
  quizData: IQuiz[];
}) {
  const { theme } = useTheme();
  const [isCreate, setIsCreate] = React.useState(false);

  if (data?.length <= 0) {
    return <EmptyView />;
  }
  if (isLoading) {
    return (
      <TextDefault>
        <ActivityIndicator style={{ marginRight: 10 }} color={theme.primary} />
        Loading...
      </TextDefault>
    );
  }
  return (
    <>
      {!isCreate && (
        <ScrollView style={{ width: "100%", flex: 1 }}>
          <Row full direction="column" rowGap={10}>
            {data?.map((item, index) => (
              <TouchableOpacity
                onPress={() => onSelected(item)}
                key={index}
                style={{
                  width: "100%",
                  backgroundColor:
                    libSelected && libSelected.id === item.id
                      ? theme.primary
                      : theme.backgroundSecond,
                  padding: normalize(10),
                  borderRadius: normalize(10),
                }}
              >
                <Row style={{ alignItems: "center" }} full start colGap={10}>
                  <FolderIcon />
                  <TextDefault
                    color={
                      libSelected && libSelected.id === item.id
                        ? theme.background
                        : theme.text
                    }
                    bold
                    style={{
                      fontSize: normalize(14),
                    }}
                  >
                    {Helper.uppercaseFirstLetter(item?.name)}
                  </TextDefault>
                </Row>
              </TouchableOpacity>
            ))}
          </Row>
        </ScrollView>
      )}
      {libSelected && (
        <CreateQuizAndAddToLibrary
          quizData={quizData}
          onClose={onClose}
          libSelected={libSelected}
          onCreate={() => setIsCreate(!isCreate)}
        />
      )}
    </>
  );
}

export default LibView;
