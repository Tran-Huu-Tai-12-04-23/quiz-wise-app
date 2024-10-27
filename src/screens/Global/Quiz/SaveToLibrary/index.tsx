import { ButtonOutlined, ButtonPrimary, IconButton } from "@components/Button";
import { Input } from "@components/Input";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { normalize } from "@helper/helpers";
import MainLayout from "@layout/MainLayout";
import AddIcon3d from "assets/svg/add-icon-3d";
import LibraryIcon from "assets/svg/lib-icon";
import React from "react";
import { TouchableOpacity } from "react-native";
import { IQuiz } from "src/dto/quiz.dto";
import { ILibrary } from "src/services/hooks/lib/dto";
import useCreateLibrary from "src/services/hooks/lib/useCreateLibrary";
import useLibPagination from "src/services/hooks/lib/useLibPagination";
import LibView from "./LibView";

function SaveToLibraryScreen({
  onClose,
  quizData,
}: {
  onClose: () => void;
  quizData: IQuiz[];
}) {
  const { theme } = useTheme();
  const [isCreate, setIsCreate] = React.useState(false);
  const [errorToCreateLib, setErrorToCreateLib] = React.useState("");
  const [libName, setLibName] = React.useState("");
  const { onCreate, isLoading } = useCreateLibrary();
  const [libSelected, setLibSelected] = React.useState<ILibrary | null>(null);
  const { data, isLoading: isLoadingLib } = useLibPagination({
    where: {},
    skip: 0,
    take: 10,
  });
  const handleCreateNewLib = async () => {
    if (libName === "") {
      setErrorToCreateLib("Please enter library name");
      return;
    }

    await onCreate({ name: libName }).then((res) => {
      setIsCreate(false);
    });
  };

  return (
    <MainLayout>
      <Separator height={normalize(40)} />
      <Row
        full
        center
        direction="column"
        rowGap={10}
        style={{
          padding: normalize(10),
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        <Row start full>
          <IconButton
            icon={
              <MaterialCommunityIcons
                name="window-close"
                size={24}
                color={theme.danger}
              />
            }
            onPress={onClose}
          />
        </Row>
        <Row
          full
          direction="column"
          center
          rowGap={5}
          style={{
            borderRadius: normalize(20),
            backgroundColor: theme.backgroundSecond,
            padding: normalize(10),
          }}
        >
          <TextDefault bold size={normalize(14)}>
            Your library
          </TextDefault>
          <LibraryIcon />
        </Row>
        <Separator height={normalize(20)} />
        {isCreate && (
          <Row full center direction="column" rowGap={10}>
            <Input
              placeholder="Enter library name"
              onChangeText={(vl) => {
                setErrorToCreateLib("");
                setLibName(vl);
              }}
              text={libName}
              error={errorToCreateLib}
            />
            <Row full center rowGap={10} colGap={10}>
              <ButtonOutlined
                title="Cancel"
                onPress={() => {
                  setErrorToCreateLib("");
                  setIsCreate(false);
                }}
                isLoading={isLoading}
              />
              <ButtonPrimary
                title="Create"
                minWidth={200}
                isLoading={isLoading}
                onPress={() => {
                  handleCreateNewLib();
                }}
              />
            </Row>
          </Row>
        )}
        {!isCreate && (
          <LibView
            quizData={quizData}
            libSelected={libSelected}
            onSelected={(val) => setLibSelected(val)}
            data={data}
            onClose={onClose}
            isLoading={isLoadingLib}
          />
        )}

        <Separator height={normalize(10)} />
      </Row>
      {!isCreate && (
        <TouchableOpacity
          onPress={() => setIsCreate(true)}
          style={{
            backgroundColor: theme.backgroundSecond,
            padding: normalize(10),
            borderRadius: 100,
            position: "absolute",
            top: normalize(40),
            right: normalize(20),
          }}
        >
          <AddIcon3d />
        </TouchableOpacity>
      )}
    </MainLayout>
  );
}

export default SaveToLibraryScreen;
